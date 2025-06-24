import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import { readingTime } from './src/js/reading-time.js'

import expressiveCode from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

// https://astro.build/config
export default defineConfig({
    site: 'https://pimenov.com.ua',
    compressHTML: true,
    markdown: {
        remarkPlugins: [readingTime],
    },
    integrations: [
        expressiveCode({
            theme: 'github-light',
            lineNumbers: true,
            plugins: [
                pluginLineNumbers({
                    style: 'inline',
                    startFrom: 1,
                }),
            ],
            languages: ['js', 'css', 'html', 'json', 'md', 'astro'],
        }), 
        mdx()
    ],
})