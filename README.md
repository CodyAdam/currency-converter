# Currency Converter

A simple node currency converter built using TypeScript with Astro, React and Tailwind CSS. 

## External libraries used

- [React](https://reactjs.org/) for UI
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Query](https://react-query.tanstack.com/) for data fetching


## 🚀 Project Structure

Inside the project, you'll see the following folders and files:

``` 
📦currency-converter
 ┣ 📂doc
 ┣ 📂public                     Static assets
 ┣ 📂src
 ┃ ┣ 📂components               React components
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜App                    Main React page
 ┃ ┃ ┣ 📜Converter.tsx
 ┃ ┃ ┣ 📜CurrencyInput.tsx
 ┃ ┃ ┗ 📜RatesDisplay.tsx        
 ┃ ┣ 📂pages
 ┃ ┃ ┗ 📜index.astro            Page entry point
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜currencies.ts          Currency data
 ┃ ┗ 📜env.d.ts
 ┣ 📜package.json
 ┣ ...
 ┗ 📜README.md
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
