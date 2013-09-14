describe('po', function() {

    var expect = chai.expect;

    it('returns a function from #create', function() {
        var pageObject = po.create();
        expect(typeof pageObject).to.equal('function');
    });

    it('contains injected methods when invoked', function() {
        var pageObject = po.create({
            test: function() {
                return 'test';
            }
        })();

        expect(pageObject.test()).to.equal('test');
    });

    it('contains injected $el when invoked', function() {
        var $el = $('<div></div>');
        var pageObject = po.create()($el);
        expect(pageObject.$el).to.equal($el);
    });

    it('has an input helper which fills in input value', function() {
        var $el = $('<div><input class="author" type="text" value=""></div>');

        var pageObject = po.create({
            author: po.input('.author')
        })($el);

        expect($el.find('.author').val()).to.equal('');

        pageObject.author('kim');

        expect($el.find('.author').val()).to.equal('kim');
    });

    it('has button helper which clicks button when invoked', function(done) {
        var $el = $('<div><input class="submit" type="submit"></div>');

        var pageObject = po.create({
            submit: po.button('.submit')
        })($el);

        $el.find('.submit').click(function() {
            done();
        });

        pageObject.submit();
    });

});
