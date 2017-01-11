var messageService = function() {
    var mod = angular.module('MessageServiceModule', []);

    function MessageService($interval) {
        var message = {};   // private property
        var timer = {};

        function messageMetaData(text) {
            this.text = text;

            this.toJson = function () {
                return this.text;
            }
        }

        var deleteMessage = function (key) {
            delete message[key];
        };

        var clearTimer = function (key) {
            if (key in timer) {
                $interval.cancel(timer[key]);
                return;
            }
        };

        function hideMessages(key, timeout) {
            if (timeout) { // @TODO Remove messages after interval not working yet :(
                var t = $interval(function () {
                    deleteMessage(key);
                }, timeout);
                timer[key] = t;
            }
        }

        var pristineMessageObject = function () {
            message = {};
        };

        var getMessage = function (key, timeout) {  // @TODO: need to hide messages after interval
            if (key in message) {
                // hideMessages(key, timeout);
                return message[key];
            }
            return null;
        };
        var setMessage = function (key, msg) {
            // clearTimer(key);    // @TODO remove messages on interval if provided
            message[key] = new messageMetaData(msg).toJson();
        };

        var clearAllMessages = function () {
            pristineMessageObject();
        };

        var handleMessage = function (key) {
            return {
                set: function (msg) {
                    setMessage(key, msg);
                },
                get: function (timeout) {
                    return getMessage(key, timeout);
                },
                delete: function () {
                    deleteMessage(key);
                },
                clearAllMessages: function () {
                    clearAllMessages();
                }
            };
        };

        return {
            handleMessage: handleMessage
        }
    }

    MessageService.$inject = ['$interval'];
    mod.factory('MessageService', MessageService);
    return mod;
};
module.exports = messageService();