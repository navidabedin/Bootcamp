const API_BASE = 'https://opentdb.com';

/**
 * Fetch available categories from Open Trivia DB.
 * @returns {Promise<Array<{id: number, name: string}>>}
 */
async function fetchCategories() {
  const res = await fetch(`${API_BASE}/api_category.php`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.trivia_categories;
}

/**
 * Fetch quiz questions.
 * @param {Object} opts
 * @param {number} opts.amount
 * @param {string} opts.difficulty  - 'easy' | 'medium' | 'hard' | 'any'
 * @param {string|number} opts.category - category id or 'any'
 * @returns {Promise<Array>}
 */
async function fetchQuestions({ amount, difficulty, category }) {
  const params = new URLSearchParams({ amount, type: 'multiple' });
  if (difficulty !== 'any') params.set('difficulty', difficulty);
  if (category !== 'any')   params.set('category', category);

  const res = await fetch(`${API_BASE}/api.php?${params}`);
  if (!res.ok) throw new Error('Failed to fetch questions');

  const data = await res.json();
  if (data.response_code === 1) return [];

  if (data.response_code !== 0) {
  throw new Error(`API error: response_code ${data.response_code}`);
  }
return data.results;
}
