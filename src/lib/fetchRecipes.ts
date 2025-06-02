export async function fetchRecipes() {
  const res = await fetch(
    'https://script.google.com/macros/s/AKfycbx9zYJGLAzF_5VAF9R1KRglMTbvwNsYXQqdoRDT-y0A91Jjvr_TV_J0ZPhg6SnsHOO2/exec?action=getRecipes'
  );
  const data = await res.json();
  return data.recipes; // adjust based on your API response
}
