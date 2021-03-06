describe('app', () => {

  beforeEach(() => browser.get('index.html'));

  describe('appRoot', () => {

    it('should display each view properly', () => {
      const links = element.all(by.css('a'));
      const preUrl = 'http://localhost:4000/index.html#!';

      links.first().click().then(() => expect(browser.getCurrentUrl()).toBe(`${preUrl}/watchlist`));
      links.get(1).click().then(() => expect(browser.getCurrentUrl()).toBe(`${preUrl}/home`));
      links.get(2).click().then(() => expect(browser.getCurrentUrl()).toBe(`${preUrl}/watched`));
    });

  });

  describe('movieList', () => {

    it('should filter the movieList', () => {
      const movieList = element.all(by.repeater('movie in $ctrl.list'));
      const query = element(by.model('$ctrl.livesearch'));

      expect(movieList.count()).toBe(3);

      query.sendKeys('vikings');
      expect(movieList.count()).toBe(1);

      query.clear();
      query.sendKeys('r');
      expect(movieList.count()).toBe(2);
    });

    it('should order the list accordingly to the dropdown-menu', () => {

      const queryField = element(by.model('$ctrl.livesearch'));
      const orderSelect = element(by.model('$ctrl.order'));
      const nameOption = orderSelect.element(by.css('option[value="name"]'));
      const movieNameColumn = element.all(by.repeater('movie in $ctrl.list').column('movie.name'));

      let getNames = () => movieNameColumn.map(elem => elem.getText());

      queryField.sendKeys('r');
      expect(getNames()).toEqual([
        'Mr. Robot - Season 3',
        'Blade Runner 2049'
      ]);
      nameOption.click();
      expect(getNames()).toEqual([
        'Blade Runner 2049',
        'Mr. Robot - Season 3'
      ]);
    });

    it('should display a checkmark when button "add" is clicked', () => {
      element.all(by.repeater('movie in $ctrl.list')).then(movies => {
        movies.forEach(movie => {
          const button = movie.element(by.className('movie-list-add'));
          button.isDisplayed().then((isVisible) => {
            if(isVisible) {
              expect(button.getText()).toEqual('Add');
                button.click().then(() => {
                  const newEl = movie.element(by.className('movie-list-checked'));
                  expect(newEl.getText()).toEqual('✓');
              });
            } else {
              expect(movie.element(by.className('movie-list-checked')).isDisplayed()).toBeTruthy();
            }
          });
        });
      });
    });



  });
});
