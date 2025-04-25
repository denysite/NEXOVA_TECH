import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";  

global.app = {
    isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

import { reset } from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";

function watcher() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(ttfToWoff, fontsStyle);
const mainTasks = gulp.series(reset, gulp.parallel(html, scss, js, images, ttfToWoff));
const devTasks = gulp.series(mainTasks, gulp.parallel(watcher, server));

gulp.task('default', devTasks);
gulp.task('fonts', fonts);
gulp.task('build', mainTasks)