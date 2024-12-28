// import { HUGGINGFACE_API_KEY } from '../config';

const HUGGINGFACE_API_KEY="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";
const HF_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';

export const generateImage = async (prompt) => {
  if (!HUGGINGFACE_API_KEY) {
    throw new Error('Hugging Face API key is not configured. Please add it to your .env file.');
  }

  // Enhance prompt for better YouTube thumbnail results
  const enhancedPrompt = `${prompt}, 4k ultra detailed, YouTube thumbnail style, vibrant colors, high contrast, cinematic lighting, dramatic composition, professional photography, eye-catching, trending on artstation, sharp focus, high impact, advertisement quality`;
  
  const negativePrompt = "blurry, low quality, low resolution, poorly drawn, bad anatomy, wrong proportions, extra limbs, floating limbs, disconnected limbs, distorted face, ugly, out of frame, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, watermark, signature, text";

  try {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          num_inference_steps: 40,
          guidance_scale: 9,
          width: 1280,
          height: 720,
          negative_prompt: negativePrompt,
          scheduler: "K_EULER_ANCESTRAL",
          num_images_per_prompt: 1,
          refiner_strength: 0.7,
          aesthetic_score: 9,
          seed: Math.floor(Math.random() * 1000000)
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to generate image: ${JSON.stringify(error)}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

// YouTube thumbnail style presets
export const thumbnailPresets = {
  gaming: {
    prefix: "epic gaming scene, action-packed, dramatic lighting, neon accents, intense atmosphere,",
    suffix: "high energy, esports style, gaming setup, streamer quality",
    style: "modern gaming aesthetic"
  },
  tech: {
    prefix: "modern tech showcase, sleek design, futuristic atmosphere, clean minimal setup,",
    suffix: "professional product photography, tech reviewer style, gadget presentation",
    style: "professional tech review"
  },
  vlog: {
    prefix: "lifestyle photography, candid moment, authentic atmosphere,",
    suffix: "influencer style, lifestyle content, social media ready",
    style: "modern vlog aesthetic"
  },
  tutorial: {
    prefix: "educational setup, professional workspace, organized composition,",
    suffix: "instructional style, clean background, educational content",
    style: "tutorial presentation"
  },
  reaction: {
    prefix: "expressive portrait, emotional impact, dynamic pose,",
    suffix: "reaction shot, engaging expression, YouTube personality style",
    style: "reaction thumbnail"
  }
};
