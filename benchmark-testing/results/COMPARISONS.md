# Comparing to Other NPM Language Prediction Packages

**Note**: If the accuracy was 0 it was assumed not to be a supported language of the package. Each package was tested with the entire 99 languages. The expected output to compare to was the iso3 value. If this value didn't match, then it would most certainly have an accuracy score of 0.

# Franc

Obtained from https://github.com/wooorm/franc/tree/main version ^5.0.0

Supported Languages: 187

Time to Completion: 2 Minutes

| Language (68)     | Symbol | Count (555790) | Accuracy (30 - 250 chars) |
| ----------------- | ------ | -------------- | ------------------------- |
| Georgian          | ka     | 1973           | 1                         |
| Bengali           | bn     | 1164           | 1                         |
| Thai              | th     | 572            | 1                         |
| Malayalam         | ml     | 517            | 1                         |
| Burmese           | my     | 216            | 1                         |
| Tamil             | ta     | 205            | 1                         |
| Telugu            | te     | 102            | 1                         |
| Punjabi (Eastern) | pa     | 88             | 1                         |
| Lao               | lo     | 70             | 1                         |
| Gujarati          | gu     | 57             | 1                         |
| Tibetan           | bo     | 20             | 1                         |
| Sinhala           | si     | 9              | 1                         |
| Amharic           | am     | 3              | 1                         |
| Greek             | el     | 12039          | 0.999916936622643         |
| Japanese          | ja     | 2169           | 0.9981558321807285        |
| Uyghur            | ug     | 3692           | 0.9981040086673889        |
| Armenian          | hy     | 518            | 0.9980694980694981        |
| Korean            | ko     | 482            | 0.9979253112033195        |
| Mandarin Chinese  | zh     | 568            | 0.9947183098591549        |
| Hebrew            | he     | 8616           | 0.994661095636026         |
| Kannada           | kn     | 118            | 0.9915254237288136        |
| Khmer             | km     | 379            | 0.9894459102902374        |
| Tajik             | tg     | 30             | 0.9666666666666667        |
| Urdu              | ur     | 963            | 0.9657320872274143        |
| Kazakh            | kk     | 2232           | 0.9363799283154122        |
| Belarusian        | be     | 6253           | 0.8984487446025907        |
| German            | de     | 22014          | 0.8912964477150904        |
| Vietnamese        | vi     | 13000          | 0.8835384615384615        |
| French            | fr     | 23076          | 0.8797018547408563        |
| Finnish           | fi     | 17406          | 0.8782603699873607        |
| Somali            | so     | 32             | 0.875                     |
| Marathi           | mr     | 10461          | 0.8501099321288595        |
| Hungarian         | hu     | 17942          | 0.8125627020399063        |
| Polish            | pl     | 17768          | 0.8096015308419631        |
| Afrikaans         | af     | 1632           | 0.8057598039215687        |
| Tatar             | tt     | 8178           | 0.7922474932746393        |
| Kyrgyz            | ky     | 66             | 0.7878787878787878        |
| Italian           | it     | 18326          | 0.7713630906908218        |
| Romanian          | ro     | 13560          | 0.7629793510324484        |
| Ukrainian         | uk     | 14285          | 0.75960798039902          |
| Hindi             | hi     | 5362           | 0.7513987318164864        |
| Portuguese        | pt     | 20174          | 0.7396649152374343        |
| Haitian Creole    | ht     | 15             | 0.7333333333333333        |
| Catalan           | ca     | 4725           | 0.7172486772486772        |
| Bulgarian         | bg     | 11144          | 0.709978463747308         |
| Dutch             | nl     | 19626          | 0.7059512891062876        |
| Norwegian Nynorsk | nn     | 657            | 0.6940639269406392        |
| Esperanto         | eo     | 17841          | 0.6932907348242812        |
| Turkmen           | tk     | 3793           | 0.6904824677036646        |
| Lithuanian        | lt     | 13835          | 0.6840621611853993        |
| English           | en     | 22428          | 0.6620296058498306        |
| Macedonian        | mk     | 14465          | 0.6540615278257864        |
| Swedish           | sv     | 12188          | 0.633081719724319         |
| Spanish           | es     | 18227          | 0.61803917265595          |
| Yoruba            | yo     | 5              | 0.6                       |
| Turkish           | tr     | 19919          | 0.5897886440082334        |
| Russian           | ru     | 17329          | 0.5891280512435801        |
| Danish            | da     | 15299          | 0.5861167396561867        |
| Czech             | cs     | 10863          | 0.5285832642916322        |
| Galician          | gl     | 2618           | 0.5248281130634072        |
| Slovak            | sk     | 4370           | 0.49702517162471394       |
| Tagalog           | tl     | 10351          | 0.4821756352043281        |
| Sundanese         | su     | 11             | 0.45454545454545453       |
| Slovenian         | sl     | 372            | 0.44623655913978494       |
| Indonesian        | id     | 9372           | 0.42509603072983354       |
| Serbian           | sr     | 13494          | 0.37868682377352897       |
| Bosnian           | bs     | 139            | 0.30935251798561153       |
| Croatian          | hr     | 2222           | 0.28622862286228623       |
| Javanese          | jv     | 260            | 0.2653846153846154        |

# LanguageDetect

Obtained from https://github.com/FGRibreau/node-language-detect version ^2.0.0

Supported Langauges: 52

Time to Completion: 1 Minute

| Language (36) | Symbol | Count (555790) | Accuracy (30 - 250 chars) |
| ------------- | ------ | -------------- | ------------------------- |
| Bengali       | bn     | 1164           | 0.9991408934707904        |
| Hindi         | hi     | 5362           | 0.9944050727340544        |
| Urdu          | ur     | 963            | 0.9927310488058152        |
| Vietnamese    | vi     | 13000          | 0.9906923076923076        |
| Arabic        | ar     | 8761           | 0.9851615112430088        |
| Dutch         | nl     | 19626          | 0.9665749515948232        |
| Indonesian    | id     | 9372           | 0.9637217242851046        |
| Kazakh        | kk     | 2232           | 0.956989247311828         |
| Welsh         | cy     | 619            | 0.9531502423263328        |
| French        | fr     | 23076          | 0.9489512913849887        |
| Icelandic     | is     | 6364           | 0.9483029541169076        |
| Polish        | pl     | 17768          | 0.9440004502476362        |
| German        | de     | 22014          | 0.9438084855092214        |
| Finnish       | fi     | 17406          | 0.9413420659542686        |
| Somali        | so     | 32             | 0.9375                    |
| Kyrgyz        | ky     | 66             | 0.9242424242424242        |
| Italian       | it     | 18326          | 0.9192404234421041        |
| Hungarian     | hu     | 17942          | 0.909263181362167         |
| English       | en     | 22428          | 0.9029338327091136        |
| Turkish       | tr     | 19919          | 0.8688187157989858        |
| Portuguese    | pt     | 20174          | 0.864677307425399         |
| Romanian      | ro     | 13560          | 0.8488200589970502        |
| Lithuanian    | lt     | 13835          | 0.8152511745572822        |
| Spanish       | es     | 18227          | 0.8088549953365886        |
| Latin         | la     | 11437          | 0.7977616507825479        |
| Bulgarian     | bg     | 11144          | 0.7865218951902369        |
| Swedish       | sv     | 12188          | 0.7738759435510338        |
| Croatian      | hr     | 2222           | 0.7583258325832584        |
| Ukrainian     | uk     | 14285          | 0.7467273363668183        |
| Russian       | ru     | 17329          | 0.6920768653701888        |
| Slovak        | sk     | 4370           | 0.6823798627002289        |
| Danish        | da     | 15299          | 0.6808288123406758        |
| Slovenian     | sl     | 372            | 0.6532258064516129        |
| Macedonian    | mk     | 14465          | 0.623574144486692         |
| Czech         | cs     | 10863          | 0.4528215041885299        |
| Tagalog       | tl     | 10351          | 0.35523137861076226       |
| Serbian       | sr     | 13494          | 0.17504075885578776       |
