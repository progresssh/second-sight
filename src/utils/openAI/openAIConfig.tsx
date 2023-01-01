import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  organization: "org-WbsAsxUbunrIkvhyB9XqCYXb",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default openai
