const gulp         = require("gulp");
const sass         = require("gulp-sass"); // Компиляция SCSS в CSS
const csso         = require("gulp-csso"); // Сжатие CSS
const gcmq         = require("gulp-group-css-media-queries"); // Групировка одинаковых Media Queries
const rename       = require("gulp-rename"); // Переименование файлов
const htmlmin      = require("gulp-htmlmin"); // Сжатие HTML или PHP
const autoprefixer = require("gulp-autoprefixer"); // Автоматическое добавление в CSS вендорных префиксов
const browserSync  = require("browser-sync").create(); // Локальный сервер для живой перезагразки страницы
const reload       = browserSync.reload; // Перезагрузка страницы

// npm install gulp gulp-sass gulp-csso gulp-group-css-media-queries gulp-rename gulp-htmlmin gulp-autoprefixer browser-sync

//==================
// Пути к файлам
const paths = {
	styles: {
		src : "./sources/*.scss",
		dest: "./public/css/"
	},
};

//==============================================================
// Запуск локального сервера для живой перезагрузки страницы
// browserSync.init({
// 	proxy : "http://lendos/",
// 	notify: false
// });

//=====================================================================================
// Компиляция SCSS в CSS, добавление вендорных префиксов, групировка медиа запросов
gulp.task("style", function(){
	return gulp
	.src(paths.styles.src)
	.pipe(sass())
	.on("error", sass.logError)
	.pipe(autoprefixer({
		overrideBrowserslist: ["last 4 versions"],
		cascade             : false
	}))
	.pipe(gcmq())
	.pipe(csso({
		restructure: false,
		sourceMap  : true,
		debug      : true
	}))
	// .pipe(csso())
	.pipe(rename({
		suffix: ".min"
	}))
	.pipe(gulp.dest(paths.styles.dest))
	.pipe(reload({
		stream: true
	}));
});

//============================
// Сжатие HTML в index.php
gulp.task("minify", function(){
	return gulp
	.src("./index_formated.php")
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest("./media/"));
});

//===========================================================================
// Следить за файлами и запускать таски при их изменении ( File Watcher )
gulp.task("default", function(){
	gulp.watch(paths.styles.src).on("change", gulp.series("style"));
	// gulp.watch("./*.php").on("change", reload);
	// gulp.watch(paths.js.src).on("change", reload);
});
