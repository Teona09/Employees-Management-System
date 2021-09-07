# Employees-Management-System

Veti construi un CMS (content management system) pentru angajati. Mai pe intelesul tuturor, un tabel cu angajati.

### Demo 1:
- [x] Informatiile care se cer despre angajati:
Nume
Prenume
Email
Sex
Data nasterii
BONUS: poza
Userul trebuie sa poata face input la toate datele astea intr-o pagina web. Informatiile vor fi afisate intr-un tabel, in aceeasi pagina.

- [x] Pentru Sex, userul va putea alege dintr-un dropdown
- [x] Pentru data nasterii, userul va putea alege dintr-un date picker 
- [x] BONUS userul nu poate sa aiba mai putin de 16 ani
- [x] Toate fieldurile sunt obligatorii (in afara de poza), daca userul nu completeaza unul din ele, primeste eroare
- [x] Angajatii pot fi stersi din tabel cu un buton X in partea dreapta

 
- [x] BONUS: validare pe email cu regex
- [x] BONUS: data nasterii va fi afisata in formatul urmator: 23.04.2021 va fi afisat ca “23 Aprilie 2021” (puteti face de mana, sau cu moment.js)
- [ ] BONUS: poza angajatului va fi afisata in stanga numelui, intr-o componenta rotunda (ca poza de profil de la instagram/facebook/teams)
- [ ] BONUS: angajatii pot sa fie sortati alfabetic, dupa nume
- [ ] BONUS: angajatii pot sa fie sortati dupa data nasterii
- [ ] BONUS: angajatii pot sa fie filtrati dupa sex / data nasterii / daca au poza sau nu
- [ ] BONUS: search bar pentru cautarea angajatilor - rezultatele vor fi afisate in tabel (practic filtrare dupa string)
- [x] BONUS: persistenta cu JSON local sau local storage
- [ ] BONUS: make it look good
- [x] BONUS: input de date cu un modal


### Demo 2:
Integrate Firebase over the Employee CMS you've demoed.

Adding an employee should insert an employee into a Firebase DB
Populating the employee table should show all the Employees in the Firebase DB

Sorting, filtering and searching should also be done on the Firebase DB using the .filter and .sort tools provided by Firebase.

You can use either Realtime Database or Cloud Firestore.
For more info, read the Firebase Documentation.