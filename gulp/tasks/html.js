import fileinclude from "gulp-file-include"
import webpHtmlNoSvg from "gulp-webp-html-nosvg"
import versionNumber from "gulp-version-number"

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )

        .pipe(fileinclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(app.plugins.gulpIf(
            app.isBuild,
            webpHtmlNoSvg()
        ))
        .pipe(app.plugins.gulpIf(
            app.isBuild,
            versionNumber({
            'value': '%DT%',
            'append': {
                'key': '_v',
                'cover': 0,
                'to': ['css', 'js', 'img']
            },
            'output': {
                'file': 'gulp/version.json'
            }
        })))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
}