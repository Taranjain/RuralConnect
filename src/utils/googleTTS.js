import axios from 'axios';

/**
 * Calls Google Cloud Text-to-Speech API to get audio content for given text in Kannada.
 * @param {string} text - The text to synthesize.
 * @returns {Promise<string>} - A promise that resolves to a base64-encoded audio content string.
 */
export async function getKannadaSpeechAudio(text) {
  const apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY'; // Replace with your actual API key
  const url = 'https://texttospeech.googleapis.com/v1/text:synthesize?key=' + apiKey;

  const requestBody = {
    input: { text },
    voice: {
      languageCode: 'kn-IN',
      ssmlGender: 'FEMALE'
    },
    audioConfig: {
      audioEncoding: 'MP3'
    }
  };

  try {
    const response = await axios.post(url, requestBody);
    if (response.data && response.data.audioContent) {
      return response.data.audioContent; // base64 encoded audio
    } else {
      throw new Error('No audio content received from Google TTS API');
    }
  } catch (error) {
    console.error('Error calling Google TTS API:', error);
    throw error;
  }
}
