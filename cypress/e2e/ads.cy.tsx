describe('Ad Board - Avito Clone', () => {
  beforeEach(() => {
    cy.intercept('GET', '/items', { fixture: 'mockAds' }).as('getAds');

    cy.visit('/');
  });

  //Проверка загрузки данных и отображения списка объявлений
  it('should load and display ads list', () => {
    cy.wait('@getAds'); // Ожидаем, пока данные будут загружены

    // Проверка, что хотя бы одно объявление отображается
    cy.get('[data-testid="ad-list"]').should('have.length.greaterThan', 0);

    // Проверка наличия кнопки "Разместить объявление"
    cy.contains('Разместить объявление').should('be.visible');
  });

  //Проверка работы поиска
  it('should filter ads by search query', () => {
    // Вводим запрос в поле поиска
    cy.get('[data-testid="search-input"]')
      .should('be.visible') // Проверяем, что поле отображается
      .type('тест'); // Вводим текст в поле

    // Проверяем, что после ввода текста фильтруются результаты
    cy.get('[data-testid="ad-list"]') // Обновляется список объявлений
      .should('contain', 'тест');
  });

  //Проверка работы фильтра
  it('should filter ads by type', () => {
    const filterType = 'Недвижимость';

    // Ожидаем загрузки данных
    cy.wait('@getAds');

    // Открываем фильтр по типу
    cy.get('[data-testid="filter-type"]').click();

    // Ожидаем появления выпадающего списка и выбираем нужную опцию
    cy.get('li[data-value="Недвижимость"]').click();

    // Проверяем, что значение было выбрано (определяем по метке или значению)
    cy.get('[data-testid="filter-type"]').should('contain', 'Недвижимость'); // Проверяем текст, который теперь отображается

    // Проверяем, что все отображаемые объявления соответствуют выбранному типу
    cy.get('[data-testid="ad-list"]').each(($ad) => {
      cy.wrap($ad).contains(`Категория: ${filterType}`);
    });
  });

  //Проверка удаления объявления
  it('should delete an ad when the delete button is clicked', () => {
    // Ожидаем загрузки данных
    cy.wait('@getAds');

    // Мокируем удаление объявления
    cy.intercept('DELETE', '/items/*').as('deleteAd');

    // Нажимаем кнопку "Удалить" для первого объявления
    cy.get('[data-testid="ad-list"]').first().find('button:contains("Удалить")').click();

    // Проверяем, что запрос DELETE был отправлен
    cy.wait('@deleteAd');

    // Проверяем, что объявление удалено из списка
    cy.get('[data-testid="ad-list"]').should('have.length', 2); // Предположим, что было 3 объявления
  });
});

describe('Ad Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/items/*', { fixture: 'adDetail.json' }).as('getAdDetail');
    cy.visit('/item/1739716477295'); // Переходим к объявлению с ID 1739716477295
  });

  //Проверка загрузки и отображения объявления
  it('should display ad details correctly', () => {
    cy.wait('@getAdDetail'); // Ждём, пока данные будут загружены

    // Проверяем, что отображаются элементы с деталями объявления
    cy.get('h4').should('contain.text', 'тест');
    cy.get('p').should('contain.text', 'тестовое объявление');
    cy.get('p').should('contain.text', 'Локация: Москва');
    cy.get('p').should('contain.text', 'Тип объявления: Недвижимость');
  });

  //Проверка загрузки ошибки
  it('should display error message when there is an error loading ad details', () => {
    // Мокируем ошибку при получении данных
    cy.intercept('GET', '/items/*', { statusCode: 500 }).as('getAdDetailError');

    cy.visit('/item/1'); // Переходим к объявлению с ID 1

    cy.wait('@getAdDetailError'); // Ждём, пока ошибка будет поймана

    // Проверяем, что отображается сообщение об ошибке
    cy.get('div').should('contain.text', 'Ошибка:');
  });
  //Проверка перехода назад и редактирования объявления
  it('should navigate back and to edit ad page correctly', () => {
    cy.intercept('GET', '/items/*', { fixture: 'adDetail.json' }).as('getAdDetail');
    cy.visit('/item/1739716477295'); // Переходим к объявлению с ID 1739716477295

    cy.wait('@getAdDetail');

    // Проверка кнопки "Назад"
    cy.get('button').contains('Назад').click();
    cy.url().should('not.include', '/item/1739716477295'); // Мы должны вернуться на предыдущую страницу

    // Проверка кнопки "Редактировать объявление"
    cy.visit('/item/1739716477295'); // Переходим к объявлению с ID 1739716477295
    cy.get('button').contains('Редактировать объявление').click();
    cy.url().should('include', '/form/1739716477295'); // Мы должны перейти на страницу редактирования
  });
});

describe('Ad Form', () => {
  beforeEach(() => {
    cy.intercept('GET', '/items', { fixture: 'adDetail.json' }).as('getForm');
    cy.visit('/form');
  });

  // Тест для создания нового объявления
  it('should create a new ad', () => {
    // Заглушка данных для формы
    cy.intercept('POST', '/items', { fixture: 'mockAds' }).as('createAd');

    // Проверяем отображение заголовка формы
    cy.contains('Новое объявление').should('be.visible');

    // Заполняем форму
    cy.get('[data-testid="ad-name"]').type('Тестовое объявление');
    cy.get('[data-testid="ad-description"]').type('Описание для теста');
    cy.get('[data-testid="location"]').type('Москва');

    // Для выбора типа объявления
    cy.get('[data-testid="ad-type-select"]').click(); // Открываем меню
    cy.get('li[data-value="Недвижимость"]').click(); // Выбираем нужное значение
    cy.get('[data-testid="ad-type-property"]').click(); // Открываем меню
    cy.get('li[data-value="Квартира"]').click();

    cy.get('[data-testid="area"]').type('20');
    cy.get('[data-testid="rooms"]').type('2');
    cy.get('[data-testid="price"]').type(5000000);

    // Отправляем форму
    cy.get('button[type="submit"]').click();

    // Проверяем, что запрос на создание был отправлен
    cy.wait('@createAd').its('request.body').should('include', {
      name: 'Тестовое объявление',
      description: 'Описание для теста',
      location: 'Москва',
      type: 'Недвижимость',
      propertyType: 'Квартира',
      area: 20,
      rooms: 2,
      price: 5000000,
    });
  });
});
