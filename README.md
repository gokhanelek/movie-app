# MovieApp

Bu proje  Angular CLI](https://github.com/angular/angular-cli) version 11.0.0 ile yapılmıştır.

## Fake API server
Projeyi çalıştırmadan önce Fake apiyi çalıştırmanız gerekiyor. Aşağıdaki komut ile çalıştırabilirsiniz. Api çalıştığında `http://localhost:3000/` url adresinden kontrol edebilirsiniz.

json-server --watch db.json

## Development server

Projede fake api ve Omdb api servisleri kullanıldı. Projenin enviroment.ts dosyası içinden url adreslerini kontrol edebilir ve değiştirebilirsiniz.

Omdb API için gerekli apikey değerine environment.ts dosyasının içinden görebilir ve değiştirebilirsiniz.

Projeyi `ng server` komutu kullanarak çalıştırabilirsiniz.


## Build

`ng build` komutunu kullanarak proje derlenir. Derleme sonrasında `\dist` klasörünün altında projenin isminde bir klasör oluşup içinde derlenmiş halini alabilirsiniz.