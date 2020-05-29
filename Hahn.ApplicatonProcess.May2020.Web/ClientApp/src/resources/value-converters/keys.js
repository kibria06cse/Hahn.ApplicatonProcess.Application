var KeysValueConverter = (function () {
    function KeysValueConverter() {
    }
    KeysValueConverter.prototype.toView = function (value) {
        if (value)
            return Reflect.ownKeys(value);
    };
    return KeysValueConverter;
}());
export { KeysValueConverter };
//# sourceMappingURL=keys.js.map