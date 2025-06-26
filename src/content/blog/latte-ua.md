---
title: "Latte: Потужний фреймворк для тестування JavaScript додатків"
author: "Serhii Pimenov"
date: 2025-06-24
cover: {
    src: "/images/blog/latte.png"
}
description: "Всебічний огляд Latte - лаконічного та потужного фреймворка для тестування JavaScript та TypeScript додатків"
tags: ["javascript", "typescript", "testing", "framework", "development"]
category: "Testing Frameworks"
slug: latte-ua
---

# Latte: потужний фреймворк для тестування JavaScript додатків

[Project Source](https://github.com/olton/latte) | [NPM Package](https://www.npmjs.com/package/@olton/latte) | [Documentation](https://latte.org.ua/)

## Що таке Latte?

Latte (від "laconic testing") — це сучасний фреймворк для тестування додатків, написаних на JavaScript та TypeScript. Розроблений як альтернатива популярним рішенням, таким як Jest, Mocha та Jasmine, Latte пропонує простий, але потужний підхід до тестування [[1]](https://latte.org.ua/).

Фреймворк надає розробникам можливість легко писати та запускати тести для різних типів застосунків, включаючи веб-додатки, компоненти React та інші модулі JavaScript.

<!-- -->

## Ключові особливості Latte

### 1. Вбудована підтримка DOM

На відміну від багатьох інших фреймворків, Latte має вбудовану підтримку DOM без необхідності додаткових бібліотек або конфігурацій. Це значно спрощує тестування компонентів, що взаємодіють з DOM, і дозволяє проводити тести в середовищі, максимально наближеному до реального браузера [[2]](https://github.com/olton/latte).

Ви можете використовувати два середовища DOM: `happy-dom`, і `jsdom`. Перший-це легка реалізація API DOM, а другий-повноцінне середовище DOM, яке підтримує всі сучасні функції браузера.

### 2. Підтримка Headless тестування

Latte підтримує headless режим тестування, що дозволяє запускати тести без візуального інтерфейсу. Це особливо корисно для CI/CD пайплайнів та автоматизованого тестування.

```js
import { B } from "@olton/latte";

beforeAll(async () => {
    await B.create();
});

afterAll(async () => {
    await B.bye();
});

describe("Google", () => {
    it("Search", async () => {
        await B.visit("https://example.com");
        const title = await B.document.title();
        expect(title).toBe("Example Domain");
    });
});
```

### 3. Простий та інтуїтивно зрозумілий синтаксис

Фреймворк пропонує зрозумілий API, що робить написання тестів простим навіть для початківців:

```javascript
describe("Моя функція додавання", () => {
    it("повинна правильно додавати два числа", () => {
        const result = add(2, 3);
        expect(result).toEqual(5);
    });

    it("повинна обробляти від'ємні числа", () => {
        const result = add(-1, -3);
        expect(result).toEqual(-4);
    });
});
```

### 4. Підтримка асинхронних тестів

Latte має вбудовану підтримку асинхронних тестів, що дозволяє легко тестувати функції з промісами, async/await та колбеками.

```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('peanut butter');
        }, 1000);
    });
}
describe(`Async tests`, () => {
    it(`fetchData returns peanut butter`, async () => {
        const data = await fetchData();
        expect(data).toBeResolvedWith('peanut butter');
    })
})
```

### 5. Розширена система матчерів

Фреймворк пропонує багатий набір матчерів для перевірки різних умов, включаючи рівність, включення, типи даних, викидання помилок та інше.

### 6. Тестування React компонентів
Latte чудово підходить для тестування React компонентів завдяки вбудованій підтримці DOM та можливості мокування функцій.

```javascript
const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

afterEach(() => {
    document.body.innerHTML = '';
});

describe('React Button (JSX)', () => {
    it('should render a button with text', async () => {
        const { container } = await R.render(<Button text="Click me" />);
        const button = container.querySelector('button');
        expect(button).toBeHtmlElement().hasText('Click me');
    });
});
```

## Інтеграція з екосистемою розробки

Latte легко інтегрується з сучасними інструментами розробки:

- **NPM/Yarn**: доступний як пакет npm `@olton/latte` [[3]](https://www.jsdelivr.com/package/npm/@olton/latte)
- **IDE інтеграція**: доступні плагіни для популярних IDE, таких як плагін Latte Test Runner для JetBrains IDE [[4]](https://plugins.jetbrains.com/plugin/27225-latte-test-runner)
- **CI/CD підтримка**: легко інтегрується з популярними CI/CD системами


## Початок роботи з Latte

Щоб почати використовувати Latte у своєму проєкті, спочатку встановіть його через npm:

```bash
npm install @olton/latte --save-dev
```

Після встановлення створіть ваш перший тестовий файл:

```javascript
// math.test.js
import { add } from './math';

describe('Математичні функції', () => {
    it('функція add повинна коректно додавати числа', () => {
        expect(add(1, 2)).toEqual(3);
    });
});
```

Запустіть тести командою:

```bash
npx latte
```

## Розширені можливості


### Мокування та шпигування

Latte надає зручні інструменти для мокування функцій та модулів:

```javascript
const mockFetch = mock(() => Promise.resolve({
    json: () => Promise.resolve({ data: 'test' })
}));

global.fetch = mockFetch;

it('повинен викликати fetch', async () => {
    await getData();
    expect(mockFetch).toHaveBeenCalled();
});
```

## Висновок

Latte — це сучасний, швидкий та зручний фреймворк для тестування JavaScript та TypeScript додатків. Його основні переваги включають вбудовану підтримку DOM, простий синтаксис та мінімальну конфігурацію, що робить його чудовим вибором як для невеликих проєктів, так і для великих корпоративних застосунків.

Завдяки активному розвитку та зростаючій спільноті, Latte стає все більш популярним серед розробників, які шукають ефективні та зручні інструменти для тестування [[5]](https://www.reddit.com/r/javascript/comments/1kbl1yq/test_everything_with_latte/).

Спробуйте Latte у своєму наступному проєкті та переконайтесь у його перевагах самостійно!

---

## Корисні посилання

- [Офіційний сайт Latte](https://latte.org.ua/)
- [GitHub репозиторій](https://github.com/olton/latte)
- [Документація](https://latte.org.ua)
- [NPM пакет](https://www.npmjs.com/package/@olton/latte)