# MovieApp

Bu proje  Angular CLI](https://github.com/angular/angular-cli) version 11.0.0 ile yapılmıştır.

## Fake API server
Projeyi çalıştırmadan önce Fake api çalıştırmanız gerekiyor. Aşağodaki komut ile çalıştırabilirsiniz. Url adresi `http://localhost:3000/`

json-server --watch db.json

## Development server

Projede fake api ve Omdb api endpoint kullanıldı. Projede enviroment.ts içinden url kontrol edebilir ve değiştirebilirsiniz.

Omdb API için gerekli apikey environment.ts dosyasından değiştirebilirsiniz.

`ng server` komutu kullanarak projeyi çalıştırın.


## Build

`ng build` komutunu kullanarak projeyi derleyebilirsiniz. `\dist` klasörünün altında projenin isminde bir klasör oluşup içinde derlenmiş projenin derlenmiş halini alabilirsiniz.

