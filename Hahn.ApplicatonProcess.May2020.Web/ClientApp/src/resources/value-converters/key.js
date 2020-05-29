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
//# sourceMappingURL=key.js.map