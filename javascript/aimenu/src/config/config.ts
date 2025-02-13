export const CONFIG = {
  GOOGLE_SEARCH_API_KEY: '',
  GOOGLE_SEARCH_CX: '',
  GOOGLE_SEARCH_ENDPOINT: 'https://www.googleapis.com/customsearch/v1',
  MENU_ANALYSIS_PROMPT: `
    Analyze this restaurant menu image and return a JSON with the following structure:
    {
      "categories": [
        {
          "name": "string",
          "items": [
            {
              "name": "string",
              "price": "string",
              "description": "string",
              "ingredients": ["string"],
              "allergens": ["string"],
              "history": "string"
            }
          ]
        }
      ]
    }
    Follow the rules:
    - Don't be lazy and return all menu items in JSON
    - If menu has sections on the photo — they should become categories in JSON. Otherwise use one category named "Menu".
    - Name and price must be taken from the menu. If there are no prices, put N/A in the field.
    - For description, ingredients and allergens you must act like a chef and describe me the dish yourself.
    - For history, provide 3-5 interesting sentences about the dish's origin, cultural significance, and historical facts.
    - (!) ONLY JSON IS ALLOWED as an answer. No explanation or other text is allowed!
  `
} 