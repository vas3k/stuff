import OpenAI from 'openai'
import { CONFIG } from '../config/config'

export const analyzeMenu = async (image: File, apiKey: string): Promise<any> => {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    })

    // Convert image to base64
    const base64Image = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.readAsDataURL(image)
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: CONFIG.MENU_ANALYSIS_PROMPT },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
    })

    if (!response.choices[0].message.content) {
      throw new Error('No response from OpenAI')
    }


    const content = response.choices[0].message.content
    const jsonMatch = content.match(/^```json\s*([\s\S]*?)\s*```$/)
    const cleanedJson = jsonMatch ? jsonMatch[1].trim() : content.trim()
    
    console.log("ChatGPT content:", cleanedJson)
    
    return JSON.parse(cleanedJson)
  } catch (error) {
    console.error('Error analyzing menu:', error)
    if (error instanceof Error && error.message.includes('401')) {
      throw new Error('Invalid API key')
    }
    throw new Error('Failed to analyze menu')
  }
}
