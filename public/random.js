"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 255, 0, 0.8)',
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
    document.body.style.cssText = "background-color: rgb(" + rgb + ")";
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
