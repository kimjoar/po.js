po.js
=====

A small library for writing [Page Objects](https://github.com/sveinung/pageobject-example)

Examples:
---------

With Page Objects you can write more maintainable and robust tests. E.g.
if you are testing a drop-down component you can write your tests like
below:

```javascript
it('chooses an option', function() {
    var view = new DropDownView({
        defaultOption: "Choose a genre",
        options: [
            { value: "Satire" },
            { value: "Fantasy" }
        ]
    });
    view.render();

    dropDownViewPageObject(view.$el).
        openMenu().
        chooseOption("Satire").
        expectToHaveChosen("Satire");
});
```

The Page Object could then be written like this:

```javascript
var dropDownViewPageObject = po.create({
    openMenu: po.button(".dropdown-trigger"),

    chooseOption: function(option) {
        this.$(".dropdown-menu a[data-value='" + option + "']").click();
        return this;
    },

    expectToHaveChosen: function(option) {
        expect(this.$(".dropdown-trigger .chosen-value")).toHaveText(option);
        return this;
    }
});
```

