const mix = require('laravel-mix');
require('laravel-mix-ejs');

mix.js('src/js/main/global.js', 'public/js')
mix.sass('src/css/style.scss', 'public/css')
mix.copyDirectory('src/assets','dist/public/static')
mix.setPublicPath('dist')
mix.extract()
mix.ejs(
    'src/views',
    'dist',
    { foo: 'bar' },
    { partials: 'src/views/partial'}
)