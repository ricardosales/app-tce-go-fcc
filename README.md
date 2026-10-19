# RevisaAI · TCE-GO B02

App de estudos com materiais e progresso salvos localmente. A única função de IA é aprofundar uma aula com pesquisa Google usando uma chave Gemini informada no próprio dispositivo.

## Desenvolvimento web

Requisitos: Node.js 22 ou superior.

```sh
npm install
npm run dev
```

## Android

Requisitos: Android Studio com Android SDK instalado. O Android Studio inclui o JDK adequado para o build do Capacitor.

Com o SDK configurado:

```sh
npm install
npm run android:apk
```

O APK de depuração será gerado em `android/app/build/outputs/apk/debug/app-debug.apk`.

O app não precisa de um servidor próprio no celular. Cada instalação guarda a chave Gemini localmente e a envia diretamente à API do Google quando você pede o aprofundamento. A chave não é incluída no APK. O progresso e as anotações permanecem no dispositivo e não sincronizam automaticamente com o navegador do computador.

## iPhone (Firebase App Distribution)

Requisitos: Mac com Xcode instalado, uma equipe do Apple Developer Program e os iPhones de teste registrados no perfil de provisionamento Ad Hoc dessa equipe. A assinatura gratuita de desenvolvimento não gera um IPA Ad Hoc para distribuição pelo Firebase.

Abra o projeto iOS e configure a assinatura automática para sua equipe:

```sh
npm install
npm run ios:open
```

No Xcode, selecione o target **App**, escolha sua equipe em **Signing & Capabilities** e confirme o Bundle Identifier `com.revisaai.app` (ele precisa estar disponível nessa equipe). Registre o UDID de cada iPhone no portal Apple Developer e inclua os aparelhos no perfil Ad Hoc. Os aparelhos também podem ser cadastrados pelo fluxo de registro de dispositivos do Firebase App Distribution; após atualizar o perfil com os novos UDIDs, gere e envie um novo IPA.

Gere o arquivo assinado para Ad Hoc:

```sh
npm run ios:ipa
```

O IPA será exportado para `ios/App/output/App.ipa`. Para builds seguintes, incremente o número de build, por exemplo:

```sh
IOS_BUILD_NUMBER=2 npm run ios:ipa
```

Envie o IPA pelo Firebase App Distribution para o app iOS registrado com o mesmo Bundle Identifier. O usuário precisa aceitar o convite e instalar o perfil de registro no iPhone. O comando usa assinatura automática do Xcode e pode solicitar autenticação/permissão para atualizar os perfis de provisionamento.
