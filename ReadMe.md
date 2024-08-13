---

## Project Structure

```
project-root/
│
├── commands 
│   ├── commands.js
├── helpers/
│   ├── embeds.js
│   ├── buttonCreate.js
│   └── pokemonFinder.js
│   └── pokemonModifier.js
│   ├── findImage.js
│   ├── getQuotes.js
│   ├── chatGPT.js
├── bot.js
├── .env
└── ReadMe.md
```

# Pokemon Discord Bot

This feature is a Pokémon Discord Bot built using Discord.js. The bot provides users with information about Pokémon cards, including their HP, level, and evolution details. Users can interact with the bot through slash commands to get Pokémon details and evolve them if possible.

## Features

- Fetch and display details of a Pokémon card.
- Show HP, level, and image of the Pokémon.
- Provide a button to evolve the Pokémon, and edit the initial response to show the evolved pokemon if found.

# Quotes Discord Bot

This feature is a Quote Generator Discord Bot built using [Api-Ninjas/quotes API](https://api-ninjas.com/api/quotes). The bot allows users to select a category from a given range and it will return a quote and the author from the choosen option. On top of that i have integrated a [Google Images scraper from search-api](https://www.searchapi.io/docs/google-images) to embed the first picture of the author when running their name on Google Images. 

## Features

- Fetch and display a quote in a given category and it's author.
- Show picture of the author.

# ChatGPT Discord Bot

This feature is an integration of ChatGPT via the [ChatGPT AI Chat Bot API from RapidAPI](https://rapidapi.com/yourdevmail/api/chatgpt-ai-chat-bot). The bot allows users to input a prompt and return a response as it would by going in the website.

## Features

- Accept input from user and provides a response using ChatGPT model.
 
### `commands.js`

This file defines the main commands for the bot and some logic per bot.

### `helpers/`

This directory contains helper functions to keep the code modular and maintainable.

- **embeds.js**: Functions to create embed messages for Pokémon details and not found messages.
- **buttonCreate.js**: Functions to create action rows and buttons for evolving Pokémon.
- **pokemonModifier.js**: Functions to fetch and send Pokémon details, handle evolution, and manage interaction updates.
- **pokemonFinder.js**:This file contains the function to fetch Pokemon details from an external API.
- **getQuotes.js**: This file contains the function to fetch quotes and authors from API_Ninjas
- **findImage.js**: This file contains the function to fetch the image url from SEARCH_API
- **chatGPT.js**: This file contains the function to fetch the response from ChatGPT model from RAPID_API

## How to Use

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Discord Bot Token
- GUILD_ID
- BOT_ID
- API_NINJAS_KEY
- SEARCH_API
- CHAT_GPT

### Installation

1. Download the folder and open it in your preferred IDE:


2. Install the required dependencies:

   ```
   npm install
   ```

3. Create the `.env` file and store the values respectively with the naming provided below:

   ```
   DISCORD_TOKEN=your-bot-token
   GUILD_ID=your-guild-id
   BOT_ID=your-bot-id
   API_NINJAS_KEY=your-ninjas-api-id
   SEARCH_API=your-search-api-id
   CHAT_GPT=your-chatgpt-api-id
   ```

4. Run the bot:

   ```
   node src/bot.js
   ```

### Commands

- **/pokemon**: Fetch and display details of a specified Pokémon.
  - **Options**: 
    - `pokemon`: The name of the Pokémon (required).
  - **Returns**: 
    - `pokemon`: An embed containing the pokemon's name as Title, their HP and level and their image.
    - `evolve`: A button which if clicked will either edit the above embed with an evolved version of that pokemon or return a message that this pokemon can't evolve.

- **/quote_finder**: Fetch and display a quote, author and their image from a choosen category.
  - **Options**: 
    - `category`: A category from the provided list (required).
  - **Returns**: 
    - `quote`: Returns a string with the quote, the author, and an embed of the author's image.

- **/chat_gpt**: Fetch and display the response based on the prompt provided from ChatGPT.
  - **Options**: 
    - `prompt`: User input (max 256) (required)
  - **Returns**: 
    - `response`: Returns a string with the same response you would get if running the app via the browser.

### Example Usage

1. **Fetch Pokémon Details**:

   Use the command `/pokemon` followed by the Pokémon name. For example:

   ```
   /pokemon pikachu
   ```

   The bot will reply with an embed showing Pikachu's details, including HP, level, and image. Also an "Evolve" button will be included.

2. **Evolve Pokémon**:

   If the Pokémon can evolve, click the "Evolve" button. The bot will fetch and display the details of the evolved Pokémon.
   If the Pokemon can't evolve, the bot will reply with Pokemon can't evolve.

3. **Fetch Quote**:

   Use the command `/quote_finder` to get a list of the built-in options, select one.
   Once selected, the bot will reply with a quote in that category, it's author and an image of theirs.
   
4. **ChatGPT**:

   Use the command `/chat_gpt` followed by a prompt. For example:
      ```
   /chat_gpt Explain briefly the history of 
   ```
   The bot will reply with the same response as in the web app. 

### ChatGPT API

During testing i have noticed that the api times out from time to time. Please understand that this is not an issue with my app but rather the service not being available at the time. Another problem is that the dev has built it to return 200 response code with message "Sorry, unavailable at the time".

## License

This project is licensed under the MIT License.


## Thank you!
---
