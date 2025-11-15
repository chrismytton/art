"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function random(max) {
    return Math.floor(Math.random() * max);
}
var CanvasPainting = /** @class */ (function () {
    function CanvasPainting(viewport) {
        this.viewport = viewport;
        this.width = viewport.width = window.innerWidth || document.body.clientWidth;
        this.height = viewport.height = window.innerHeight || document.body.clientHeight;
        var ctx = viewport.getContext('2d');
        if (!ctx) {
            throw new Error("Failed to getContext from canvas element");
        }
        this.ctx = ctx;
    }
    CanvasPainting.prototype.square = function (startX, startY) {
        this.ctx.fillRect(startX, startY, 50, 50);
    };
    CanvasPainting.prototype.triangle = function (startX, startY) {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(startX + 50, startY);
        this.ctx.lineTo(startX + 25, startY - 50);
        this.ctx.fill();
    };
    CanvasPainting.prototype.circle = function (startX, startY) {
        this.ctx.beginPath();
        this.ctx.arc(startX, startY, 25, 0, Math.PI * 2, true);
        this.ctx.fill();
    };
    return CanvasPainting;
}());
var Lines = /** @class */ (function (_super) {
    __extends(Lines, _super);
    function Lines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lines.prototype.render = function () {
        this.ctx.lineWidth = 3;
        // Between 5 and 10 lines
        var lineCount = 5 + random(5);
        var colors = ['deeppink', 'darkorange', 'lime'];
        for (var i = 0; i < lineCount; i++) {
            var color = colors[random(colors.length)];
            var startX = random(this.width);
            var startY = random(this.height / 2);
            var endX = random(this.width);
            var endY = random(this.height / 2) + (this.height / 2);
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        }
    };
    return Lines;
}(CanvasPainting));
var Shapes = /** @class */ (function (_super) {
    __extends(Shapes, _super);
    function Shapes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shapes.prototype.render = function () {
        this.ctx.lineWidth = 3;
        var shapes = ['square', 'triangle', 'circle'];
        var colors = [
            'rgba(255, 0, 0, 0.8)', // Red
            'rgba(255, 255, 0, 0.8)', // Yellow
            'rgba(0, 0, 255, 0.8)' // Blue
        ];
        var shapeCount = 18;
        for (var i = 0; i < shapeCount; i++) {
            var color = colors[random(colors.length)];
            var shape = shapes[random(shapes.length)];
            var startX = random(this.width);
            var startY = random(this.height);
            this.ctx.fillStyle = color;
            this[shape](startX, startY);
        }
    };
    return Shapes;
}(CanvasPainting));
var Combo = /** @class */ (function (_super) {
    __extends(Combo, _super);
    function Combo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Combo.prototype.render = function () {
        randomBackgroundColor();
        Lines.prototype.render.call(this);
        Shapes.prototype.render.call(this);
    };
    return Combo;
}(CanvasPainting));
function randomBackgroundColor() {
    var rgb = [
        random(255),
        random(255),
        random(255)
    ].join(",");
    document.body.style.cssText = "background-color: rgb(".concat(rgb, ")");
}
function changingRandomBackgroundColor() {
    return setInterval(randomBackgroundColor, 500);
}
function renderShapes() {
    var viewport = document.getElementById('viewport');
    if (!viewport) {
        return;
    }
    var shapes = new Shapes(viewport);
    shapes.render();
}
function renderLines() {
    var viewport = document.getElementById('viewport');
    if (!viewport) {
        throw new Error("Couldn't find element with id 'viewport'");
    }
    var lines = new Lines(viewport);
    lines.render();
}
function renderCombo() {
    var viewport = document.getElementById('viewport');
    if (!viewport) {
        throw new Error("Couldn't find element with id 'viewport'");
    }
    var combo = new Combo(viewport);
    combo.render();
}
var AsciiArt = /** @class */ (function () {
    function AsciiArt(container) {
        this.container = container;
        // Calculate how many characters can fit based on viewport
        this.width = Math.floor((window.innerWidth || document.body.clientWidth) / 12);
        this.height = Math.floor((window.innerHeight || document.body.clientHeight) / 20);
        // Different ASCII characters with varying visual density
        this.characters = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];
    }
    AsciiArt.prototype.render = function () {
        var art = '';
        // Generate pattern based on position
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                // Create patterns using math functions
                var distance = Math.sqrt(Math.pow(x - this.width / 2, 2) +
                    Math.pow(y - this.height / 2, 2));
                // Use different patterns based on randomness
                var pattern = random(3);
                var charIndex = void 0;
                if (pattern === 0) {
                    // Circular pattern
                    charIndex = Math.floor(distance) % this.characters.length;
                }
                else if (pattern === 1) {
                    // Wave pattern
                    charIndex = Math.floor(Math.sin(x / 3) * Math.cos(y / 3) * this.characters.length / 2) + Math.floor(this.characters.length / 2);
                }
                else {
                    // Random noise
                    charIndex = random(this.characters.length);
                }
                art += this.characters[charIndex];
            }
            art += '\n';
        }
        this.container.textContent = art;
    };
    return AsciiArt;
}());
function renderAsciiArt() {
    var container = document.getElementById('ascii-container');
    if (!container) {
        throw new Error("Couldn't find element with id 'ascii-container'");
    }
    var ascii = new AsciiArt(container);
    ascii.render();
}
