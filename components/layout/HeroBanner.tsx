'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function HeroBanner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 overflow-hidden"
    >
      {/* Cursor gradient pattern effect */}
      {isHovering && (
        <>
          {/* Primary gradient layer */}
          <div
            className="pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(255, 255, 255, 0.4) 0%,
                rgba(147, 197, 253, 0.3) 25%,
                rgba(59, 130, 246, 0.2) 50%,
                transparent 70%)`,
            }}
          />
          {/* Secondary gradient layer for depth */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse 800px 500px at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(255, 255, 255, 0.25) 0%,
                rgba(191, 219, 254, 0.15) 40%,
                transparent 70%)`,
            }}
          />
          {/* Accent gradient layer */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-700"
            style={{
              background: `conic-gradient(from ${(mousePosition.x + mousePosition.y) * 0.1}deg at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(255, 255, 255, 0.2) 0deg,
                rgba(147, 197, 253, 0.15) 90deg,
                rgba(59, 130, 246, 0.1) 180deg,
                rgba(147, 197, 253, 0.15) 270deg,
                rgba(255, 255, 255, 0.2) 360deg)`,
              maskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 70%)`,
            }}
          />
        </>
      )}

      <Container>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to ShopHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Discover amazing products at unbeatable prices. Shop the latest in
            electronics, fashion, books, and home goods.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Shop All Products
              </Button>
            </Link>
            <Link href="/products?category=electronics">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Browse Electronics
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
