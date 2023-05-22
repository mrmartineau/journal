import { json } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { OpenAIExt, type ServerStreamChatCompletionConfig } from 'openai-ext';
import { OPENAI_API_KEY } from '$env/static/private';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function POST({ request }) {
  try {
    const streamConfig: ServerStreamChatCompletionConfig = {
      openai: openai,
      handler: {
        onContent(content, isFinal, stream) {
          console.log(content, 'isFinal?', isFinal);
        },
        onDone(stream) {
          console.log('Done!');
        },
        onError(error, stream) {
          console.error(error);
        }
      }
    };

    const { action, entry } = await request.json();
    const systemPromptBase =
      'You are a helpful journaling assistant that helps people write better journal entries. Output in markdown format. Do not use links. Do not include a date in the output. Only respond in the first person and do not give advice or comment on the content, only output as if the content was written by the user. Use line breaks and double line breaks to represent paragraphs throughout the output. Add emojis that relate to the content in relevant places. Use British English spelling, not American English.';
    let systemPrompt = '';
    switch (action) {
      case 'continue':
        systemPrompt = `Continue writing the following journal entry, no more than 3 sentences. Do not rewrite or include the original entry in the output:`;
        break;
      case 'improve':
        systemPrompt = 'Improve the writing for the following journal entry:';
        break;
      case 'fix':
        systemPrompt =
          'Fix spelling and grammar in the following journal entry:';
        break;
      case 'shorter':
        systemPrompt = 'Make the following journal entry more concise:';
        break;
      case 'longer':
        systemPrompt =
          'Make the following journal entry more verbose, but not boring:';
        break;
      case 'simplify':
        systemPrompt = 'Simplify the language in the following journal entry:';
        break;
      case 'tone:casual':
        systemPrompt =
          'Make the tone of the following journal entry more casual:';
        break;
      case 'tone:confident':
        systemPrompt =
          'Make the tone of the following journal entry more confident:';
        break;

      default:
        systemPrompt = systemPromptBase;
        break;
    }
    const openaiStreamResponse =
      await await OpenAIExt.streamServerChatCompletion(
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPromptBase + systemPrompt
            },
            {
              role: 'user',
              content: entry
            }
          ]
        },
        streamConfig
      );

    return new Response(openaiStreamResponse.data, {
      headers: {
        'content-type': 'text/event-stream'
      }
    });
  } catch (error: unknown) {
    return json(error, { status: error?.status || 500 });
  }
}
