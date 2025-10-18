'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart-store';
import { CheckoutFormData } from '@/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10,}$/, 'Phone must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'Please select a state'),
  zipCode: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  country: z.string().min(1, 'Please select a country'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  cardName: z.string().min(3, 'Name on card is required'),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

export function CheckoutForm() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store order data in session storage for confirmation page
    sessionStorage.setItem('lastOrder', JSON.stringify(data));

    // Clear cart
    clearCart();

    // Redirect to confirmation
    router.push('/order-confirmation');
  };

  const stateOptions = [
    { value: '', label: 'Select State' },
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'IL', label: 'Illinois' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'OH', label: 'Ohio' },
    { value: 'other', label: 'Other' },
  ];

  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'MX', label: 'Mexico' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Customer Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label="Last Name"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Phone"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            placeholder="1234567890"
          />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Shipping Address
        </h2>
        <div className="space-y-4">
          <Input
            label="Street Address"
            {...register('address')}
            error={errors.address?.message}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              {...register('city')}
              error={errors.city?.message}
            />
            <Select
              label="State"
              {...register('state')}
              options={stateOptions}
              error={errors.state?.message}
            />
            <Input
              label="ZIP Code"
              {...register('zipCode')}
              error={errors.zipCode?.message}
              placeholder="12345"
            />
          </div>
          <Select
            label="Country"
            {...register('country')}
            options={countryOptions}
            error={errors.country?.message}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Payment Information
        </h2>
        <div className="space-y-4">
          <Input
            label="Card Number"
            {...register('cardNumber')}
            error={errors.cardNumber?.message}
            placeholder="1234567812345678"
            helperText="This is a demo - no real payment will be processed"
          />
          <Input
            label="Name on Card"
            {...register('cardName')}
            error={errors.cardName?.message}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              {...register('expiryDate')}
              error={errors.expiryDate?.message}
              placeholder="MM/YY"
            />
            <Input
              label="CVV"
              {...register('cvv')}
              error={errors.cvv?.message}
              placeholder="123"
            />
          </div>
        </div>
      </Card>

      <Button
        type="submit"
        fullWidth
        size="lg"
        isLoading={isSubmitting}
      >
        Complete Order
      </Button>
    </form>
  );
}
