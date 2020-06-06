# SapTool

## Grundsätzliches und Dateien

Es wurde font-awesome für die Icons über das Paket `font-awesome` eingebunden (https://fontawesome.com). Beispiel in `edit-table.component.html` das so aussieht `<i class="fa fa-file"></i>`.

Die hauptsächlichen Styles wurden in /styles/ einsortiert. Die wurden in `app/styles.scss` über ein Import eingebracht. Momentan sind die Sachen eigentlich nur in einer Komponetne relevant, weswegen sie auch darin definiert hätten werden können, aber für weitere Ausbauten ist das vielleicht sinnvoll.


## App-Component

Hier gehts los, klar.

Die Componente kümmert sich um die Selectbox in der man die Tabellen auswählen kann.
Diese braucht erstmal die Liste vom Server. Hierzu wurde der `ApiDataService` angelegt, der soll sich um alle Anfragen kümmern.

Also geht es mit einer leeren Selectbox los, und wenn dann später die List der Tabellen vom Server eingetrudelt ist, wird diese in die Selectbox gesetzt.

Weiter geht es mit der eigentlichen Arbeit, der `app-edit-table` diese wird daruch aktiviert, indem sie einen Tabellennamen bekommt.


## EditTableComponent

Es wird ein Taebellenname eingeben.

`ngOnInit` kommt dran wenn die Komponente erstellt wurde, und `ngOnChanges` wenn sich der Tabelenname ändert. In dem Fall wird beidesmal bei `ApiDataService` nach den Metainformationen gefragt, und diese in die Komponente gesetzt, um die Tabellenspalten anzupassen.

Das Anzeigen der Zeilen ist momnetan auf 10 Fixiert, aber die 10 ist in der Kmponente festgelegt, um eine Eingabemöglichkeit für die Page-Size zu ermöglichen.

Die neuen Elemente werden noch nicht in der Liste einsortiert, sondern oben angezeigt aus folgenden Gründen:
 * Der Server übernimmt ja das Filtern, und der kennt die neuen Elemente noch nicht, wesegen es sie bei der Selektion auch nicht berücksichtigen könnte
 * Die User-Experience könnte darunter leiden, wenn man etwas neu anlegt, dass durch die Filterung nicht auf der Anzeige zu sehen sein würde
 * So wars einfacher zu implementierten

Laden der Daten geschieht immer mit Angabe der Seite. Beim Filtern wird immer erstmal auf Seite 1 gesprungen, weil man nicht weiß, wielviele Elemente übrig leiben würden.

### Header und Values

Weil hier schon auf verschiedene Typen rücksicht genommen wird ("value" hat den Datentyp `string | number | boolean`), hat man an vielen Stellen die Fallunterscheidung.
Deswegen wurden für diese Stellen Unterkomponenten `edit-table-edit-value` `edit-table-show-value` `edit-table-header-value` angelegt, um diese Wegzukapseln.

## EditService

Behälter für die Editierten Sachen.

Immer Wenn eine Änderung stattfindet, wird diese zuerst im Edit-Servive vorgehalten. Erst beim Speichern wird diese dann an den Srver übertragen.
Also kann bei der Anzeige zwischen "Originalwert" und "Akteullem" Wert unterschieden werden, wobei der "Aktuelle" noch nicht persistiert ist.

Der Service braucht für jede Änderung einen Tabellennamen, so kann er verschiedene Tabellen gleichzeitig verabreiten.

`saveNewItem` Speichert ein Element, aus der "Neu-Liste" auf dem Serer
`updateNewItem` Speichert ein Element, aus der "Editiert-Liste" auf dem Sever. In Ermangelung eines Keys wird einfach das komplette Original, und die Geänderte Version mitgegeben. Diese werden dem Server gegeben, und der kann sich mit dem Original selber heraussuchen, welche Zeile betroffen ist.


