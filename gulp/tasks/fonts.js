import fs from 'fs';

export const ttfToWoff = async () => {
    const ttf2woff2 = (await import('gulp-ttf2woff2')).default;
    return app.gulp.src(app.path.src.fonts, {
        encoding: false,
        removeBOM: false
    })
    .pipe(app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
            title: 'Fonts',
            message: "Error: <%= error.message %>",
            sound: false
        })
    }))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));
}
export const fontsStyle = async () => {
    let fontsFile = `${app.path.srcFolder}/scss/base/_fonts.scss`;

    console.log("Шлях до _fonts.scss:", fontsFile);
    console.log("Шлях до шрифтів:", app.path.build.fonts);

    // Видаляємо файл, якщо передано флаг --rewrite
    if (app.isFontsReW && fs.existsSync(fontsFile)) {
        fs.unlinkSync(fontsFile);
    }

    // Перевіряємо, чи існує папка з шрифтами
    if (!fs.existsSync(app.path.build.fonts)) {
        console.log("Папка dist/fonts не існує.");
        return;
    }

    // Читаємо файли шрифтів
    const fontsFiles = await new Promise((resolve, reject) => {
        fs.readdir(app.path.build.fonts, (err, files) => {
            if (err) {
                console.error("Помилка читання папки шрифтів:", err);
                return reject(err);
            }
            resolve(files);
        });
    });

    console.log("Файли шрифтів:", fontsFiles);

    if (fontsFiles && fontsFiles.length > 0) {
        // Створюємо файл, якщо його немає
        if (!fs.existsSync(fontsFile)) {
            fs.writeFileSync(fontsFile, '');
            let newFileOnly;
            for (let i = 0; i < fontsFiles.length; i++) {
                let fontFileName = fontsFiles[i].split('.')[0];
                console.log("Обробляється файл:", fontFileName);

                if (newFileOnly !== fontFileName) {
                    let fontName = fontFileName.split('-')[0] || fontFileName;
                    let fontWeight = fontFileName.split('-')[1] || 'regular';

                    // Визначаємо вагу шрифту
                    switch (fontWeight.toLowerCase()) {
                        case 'thin': fontWeight = 100; break;
                        case 'extralight': fontWeight = 200; break;
                        case 'light': fontWeight = 300; break;
                        case 'medium': fontWeight = 500; break;
                        case 'semibold': fontWeight = 600; break;
                        case 'bold': fontWeight = 700; break;
                        case 'extrabold':
                        case 'heavy': fontWeight = 800; break;
                        case 'black': fontWeight = 900; break;
                        default: fontWeight = 400;
                    }

                    // Додаємо CSS для шрифту
                    fs.appendFileSync(fontsFile, `@font-face {
    font-family: '${fontName}';
    font-display: swap;
    src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
    font-weight: ${fontWeight};
    font-style: normal;
}\r\n`);
                    newFileOnly = fontFileName;
                }
            }
        } else {
            console.log("Файл scss/base/_fonts.scss вже існує. Для оновлення видаліть його вручну або використовуйте флаг --rewrite.");
        }
    } else {
        console.log("Шрифти не знайдено в папці:", app.path.build.fonts);
    }
};
function cb() { }