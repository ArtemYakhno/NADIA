import photo from '/public/Фото 3х4.jpg'
export const missingPeople = [
    {
        ID: 1,
        fullName: 'Іван Петров Артемович',
        firstName: 'Іван',
        lastName: 'Петров',
        fatherName: 'Артемович',
        dob: '1985-06-15',
        dom:'2024-04-04',
        photo: '/008-010_dis_club.jpg?url',
        lastSeenLocation: 'Київ, Україна',
        isMilitary: false,
        sex: 'Чоловіча',
        identificationNumber:'55656243',
        bornLocation:'Київ, Україна',
        confirmationInfo:{
            moderatorName:'Артем Яхно',
            status: 'waiting accept',
            solution:'Причина не вказана'
        },
        verification:{
            verificationMIA:false,
            verificationOtherRegistry:true,
            verificationContent:true
        },
        additionInformation: {
            height: "180",
            tpBody: "Худе",
            tpHairstyle: "Кор сотке",
            clEyes: 'Блакитні',
            clSkin: 'Світлий',
            clHair: 'Коричневий',
            tattoo: 'щось',
            comment: null
        },
        user: {
            userID:1,
            phoneNumber: "+380992293112",
            email: "artemen23093@gmail.com"
        }
    },
    {
        ID: 2,
        fullName: 'Дурня Дурня Дурня',
        firstName: 'Дурня',
        lastName: 'Дурня',
        fatherName: 'Дурня',
        dob: '1990-09-21',
        dom:'2024-04-04',
        photo: '/008-010_dis_club.jpg?url',
        lastSeenLocation: 'Львів, Україна',
        isMilitary: true,
        sex: 'Жіноча',
        identificationNumber:'55656643',
        bornLocation:'Львів, Україна',
        confirmationInfo:{
            moderatorName:'Система',
            status: 'blocked',
            solution:'Контент не пройшов перевірку!'
        },
        verification:{
            verificationMIA:false,
            verificationOtherRegistry:false,
            verificationContent:false
        },
        additionInformation: {
            height: "165",
            tpBody: "Середнє",
            tpHairstyle: "Довге",
            clEyes: 'Карі',
            clSkin: 'Дуже світлий',
            clHair: 'Чорне',
            tattoo:  "Татуювання на спині",
            comment: "Любить спорт"
        },
        user: {
            userID:1,
            phoneNumber: "+380993456789",
            email: "maria.ivanova@example.com"
        }
    },
    {
        ID: 3,
        fullName: 'Петро Сидоров Сидорович',
        firstName: 'Петро',
        lastName: 'Сидоров',
        fatherName: 'Сидорович',
        dob: '1978-12-12',
        dom:'2024-04-04',
        photo: '/008-010_dis_club.jpg?url',
        lastSeenLocation: 'Одеса, Україна',
        isMilitary: false,
        sex: 'Чоловіча',
        identificationNumber:'55156243',
        bornLocation:'Київ, Україна',
        verification:{
            verificationMIA:true,
            verificationOtherRegistry:true,
            verificationContent:true
        },
        confirmationInfo:{
            moderatorName:'Система',
            status: 'accept',
            solution:'Причина не вказана'
        },
        additionInformation: {
            height: "175",
            tpBody: "Повне",
            tpHairstyle: "Куряче",
            clEyes: 'Чорні',
            clSkin: 'Темний',
            clHair: 'Руде',
            tattoo: null,
            comment: "Має родимку на щоці"
        },
        user: {
            userID:2,
            phoneNumber: "+380994567890",
            email: "petro.sydorov@example.com"
        }
    },
    {
        ID: 4,
        fullName: 'Олексій Коваленко Олексійович',
        firstName: 'Олексій',
        lastName: 'Коваленко',
        fatherName: 'Олексійович',
        dob: '1982-11-30',
        dom:'2024-04-04',
        photo: '/depositphotos_32817757-stock-photo-smiling-man.jpg?url',
        lastSeenLocation: 'Харків, Україна',
        isMilitary: false,
        sex: 'Чоловіча',
        identificationNumber:'55650243',
        bornLocation:'Харків, Україна',
        verification:{
            erificationMIA:false,
            verificationOtherRegistry:true,
            verificationContent:true
        },
        confirmationInfo:{
            moderatorName:'Артем Яхно',
            status: 'accept',
            solution:'Причина не вказана'
        },
        additionInformation: {
            height: "178",
            tpBody: "Середнє",
            tpHairstyle: "Відсутнє",
            clEyes: 'Жовті',
            clSkin: 'Світлий',
            clHair: 'Біле',
            tattoo: "Татуювання на лівій руці",
            comment: "Має окуляри"
        },
        user: {
            userID:1,
            phoneNumber: "+380995678901",
            email: "oleksiy.kovalenko@example.com"
        }
    },
    {
        ID: 5,
        fullName: 'Олег Сміт Олександрович',
        firstName: 'Олег',
        lastName: 'Сміт',
        fatherName: 'Олександрович',
        dob: '1990-01-15',
        dom: '2024-03-20',
        photo: '/008-010_dis_club.jpg?url',
        lastSeenLocation: 'Харків, Україна',
        isMilitary: false,
        sex: 'Чоловіча',
        identificationNumber: '12345678',
        bornLocation: 'Харків, Україна',
        verification: {
            verificationMIA: true,
            verificationOtherRegistry: true,
            verificationContent: true
        },
        confirmationInfo: {
            moderatorName: 'Система',
            status: 'accept',
            solution: 'Причина не вказана'
        },
        additionInformation: {
            height: "180",
            tpBody: "Середнє",
            tpHairstyle: "Коротке",
            clEyes: 'Карі',
            clSkin: 'Світлий',
            clHair: 'Чорне',
            tattoo: 'немає',
            comment: 'Зник безвісти під час прогулянки'
        },
        user: {
            userID: 5,
            phoneNumber: "+380991234567",
            email: "oleg.smit@example.com"
        }
    },
    {
        ID: 6,
        fullName: 'Марія Іванова Петрівна',
        firstName: 'Марія',
        lastName: 'Іванова',
        fatherName: 'Петрівна',
        dob: '1987-05-25',
        dom: '2024-03-22',
        photo: '/divchina.png?url',
        lastSeenLocation: 'Львів, Україна',
        isMilitary: false,
        sex: 'Жіноча',
        identificationNumber: '87654321',
        bornLocation: 'Львів, Україна',
        verification: {
            verificationMIA: true,
            verificationOtherRegistry: true,
            verificationContent: true
        },
        confirmationInfo: {
            moderatorName: 'Система',
            status: 'accept',
            solution: 'Причина не вказана'
        },
        additionInformation: {
            height: "165",
            tpBody: "Худе",
            tpHairstyle: "Довге",
            clEyes: 'Зелені',
            clSkin: 'Світлий',
            clHair: 'Біляве',
            tattoo: 'немає',
            comment: 'Мала при собі чорний рюкзак'
        },
        user: {
            userID: 6,
            phoneNumber: "+380998765432",
            email: "maria.ivanova@example.com"
        }
    },
    {
        ID: 7,
        fullName: 'Сергій Коваленко Дмитрович',
        firstName: 'Сергій',
        lastName: 'Коваленко',
        fatherName: 'Дмитрович',
        dob: '1995-02-17',
        dom: '2024-03-24',
        photo: '/008-010_dis_club.jpg?url',
        lastSeenLocation: 'Одеса, Україна',
        isMilitary: true,
        sex: 'Чоловіча',
        identificationNumber: '23456789',
        bornLocation: 'Одеса, Україна',
        verification: {
            verificationMIA: true,
            verificationOtherRegistry: true,
            verificationContent: true
        },
        confirmationInfo: {
            moderatorName: 'Система',
            status: 'accept',
            solution: 'Причина не вказана'
        },
        additionInformation: {
            height: "185",
            tpBody: "Середнє",
            tpHairstyle: "Коротке",
            clEyes: 'Блакитні',
            clSkin: 'Темний',
            clHair: 'Руде',
            tattoo: 'на лівій руці',
            comment: 'Має татуювання на лівій руці'
        },
        user: {
            userID: 7,
            phoneNumber: "+380997654321",
            email: "serhiy.kovalenko@example.com"
        }
    },
    {
        ID: 8,
        fullName: 'Андрій Бондаренко Олексійович',
        firstName: 'Андрій',
        lastName: 'Бондаренко',
        fatherName: 'Олексійович',
        dob: '1983-04-14',
        dom: '2024-03-26',
        photo: '/008-010_dis_club.jpg?url',
        lastSeenLocation: 'Київ, Україна',
        isMilitary: false,
        sex: 'Чоловіча',
        identificationNumber: '34567890',
        bornLocation: 'Київ, Україна',
        verification: {
            verificationMIA: true,
            verificationOtherRegistry: true,
            verificationContent: true
        },
        confirmationInfo: {
            moderatorName: 'Система',
            status: 'accept',
            solution: 'Причина не вказана'
        },
        additionInformation: {
            height: "175",
            tpBody: "Худе",
            tpHairstyle: "Середнє",
            clEyes: 'Карі',
            clSkin: 'Світлий',
            clHair: 'Чорне',
            tattoo: 'немає',
            comment: 'Був одягнений у синю куртку'
        },
        user: {
            userID: 8,
            phoneNumber: "+380998123456",
            email: "andriy.bondarenko@example.com"
        }
    },
    // {
    //     ID: 9,
    //     fullName: 'Оксана Левченко Михайлівна',
    //     firstName: 'Оксана',
    //     lastName: 'Левченко',
    //     fatherName: 'Михайлівна',
    //     dob: '1975-09-12',
    //     dom: '2024-03-28',
    //     photo: '/images/person9.jpg',
    //     lastSeenLocation: 'Львів, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '45678901',
    //     bornLocation: 'Львів, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "160",
    //         tpBody: "Повне",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Сині',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Носить окуляри'
    //     },
    //     user: {
    //         userID: 9,
    //         phoneNumber: "+380997654123",
    //         email: "oksana.levchenko@example.com"
    //     }
    // },
    // {
    //     ID: 10,
    //     fullName: 'Дмитро Сидоров Андрійович',
    //     firstName: 'Дмитро',
    //     lastName: 'Сидоров',
    //     fatherName: 'Андрійович',
    //     dob: '1990-11-03',
    //     dom: '2024-03-30',
    //     photo: '/images/person10.jpg',
    //     lastSeenLocation: 'Одеса, Україна',
    //     isMilitary: false,
    //     sex: 'Чоловіча',
    //     identificationNumber: '56789012',
    //     bornLocation: 'Одеса, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "185",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Чорні',
    //         clSkin: 'Темний',
    //         clHair: 'Руде',
    //         tattoo: 'немає',
    //         comment: 'Має родимку на щоці'
    //     },
    //     user: {
    //         userID: 10,
    //         phoneNumber: "+380996543210",
    //         email: "dmytro.sydorov@example.com"
    //     }
    // },
    // {
    //     ID: 11,
    //     fullName: 'Ірина Шевченко Володимирівна',
    //     firstName: 'Ірина',
    //     lastName: 'Шевченко',
    //     fatherName: 'Володимирівна',
    //     dob: '1988-07-22',
    //     dom: '2024-04-01',
    //     photo: '/images/person11.jpg',
    //     lastSeenLocation: 'Харків, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '67890123',
    //     bornLocation: 'Харків, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "170",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Зелені',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Любить спорт'
    //     },
    //     user: {
    //         userID: 11,
    //         phoneNumber: "+380995432109",
    //         email: "iryna.shevchenko@example.com"
    //     }
    // },
    // {
    //     ID: 12,
    //     fullName: 'Олександр Тарасович Соколов',
    //     firstName: 'Олександр',
    //     lastName: 'Соколов',
    //     fatherName: 'Тарасович',
    //     dob: '1970-02-19',
    //     dom: '2024-04-03',
    //     photo: '/images/person12.jpg',
    //     lastSeenLocation: 'Київ, Україна',
    //     isMilitary: true,
    //     sex: 'Чоловіча',
    //     identificationNumber: '78901234',
    //     bornLocation: 'Київ, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "180",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Сині',
    //         clSkin: 'Темний',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на лівій руці'
    //     },
    //     user: {
    //         userID: 12,
    //         phoneNumber: "+380994321098",
    //         email: "oleksandr.sokolov@example.com"
    //     }
    // },
    // {
    //     ID: 13,
    //     fullName: 'Тетяна Іваненко Олександрівна',
    //     firstName: 'Тетяна',
    //     lastName: 'Іваненко',
    //     fatherName: 'Олександрівна',
    //     dob: '1985-10-10',
    //     dom: '2024-04-05',
    //     photo: '/images/person13.jpg',
    //     lastSeenLocation: 'Львів, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '89012345',
    //     bornLocation: 'Львів, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "165",
    //         tpBody: "Повне",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Має татуювання на правій нозі'
    //     },
    //     user: {
    //         userID: 13,
    //         phoneNumber: "+380993210987",
    //         email: "tetyana.ivanenko@example.com"
    //     }
    // },
    // {
    //     ID: 14,
    //     fullName: 'Микола Степанов Іванович',
    //     firstName: 'Микола',
    //     lastName: 'Степанов',
    //     fatherName: 'Іванович',
    //     dob: '1980-06-30',
    //     dom: '2024-04-07',
    //     photo: '/images/person14.jpg',
    //     lastSeenLocation: 'Одеса, Україна',
    //     isMilitary: false,
    //     sex: 'Чоловіча',
    //     identificationNumber: '90123456',
    //     bornLocation: 'Одеса, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "170",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Чорні',
    //         clSkin: 'Темний',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має родимку на шиї'
    //     },
    //     user: {
    //         userID: 14,
    //         phoneNumber: "+380992109876",
    //         email: "mykola.stepanov@example.com"
    //     }
    // },
    // {
    //     ID: 15,
    //     fullName: 'Анна Бондар Андріївна',
    //     firstName: 'Анна',
    //     lastName: 'Бондар',
    //     fatherName: 'Андріївна',
    //     dob: '1992-03-21',
    //     dom: '2024-04-09',
    //     photo: '/images/person15.jpg',
    //     lastSeenLocation: 'Харків, Україна',
    //     isMilitary: true,
    //     sex: 'Жіноча',
    //     identificationNumber: '01234567',
    //     bornLocation: 'Харків, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "160",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Сині',
    //         clSkin: 'Світлий',
    //         clHair: 'Руде',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на лобі'
    //     },
    //     user: {
    //         userID: 15,
    //         phoneNumber: "+380991098765",
    //         email: "anna.bondar@example.com"
    //     }
    // },
    // {
    //     ID: 16,
    //     fullName: 'Олег Литвиненко Петрович',
    //     firstName: 'Олег',
    //     lastName: 'Литвиненко',
    //     fatherName: 'Петрович',
    //     dob: '1984-12-29',
    //     dom: '2024-04-11',
    //     photo: '/images/person16.jpg',
    //     lastSeenLocation: 'Київ, Україна',
    //     isMilitary: false,
    //     sex: 'Чоловіча',
    //     identificationNumber: '12345678',
    //     bornLocation: 'Київ, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "175",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Зник під час поїздки на роботу'
    //     },
    //     user: {
    //         userID: 16,
    //         phoneNumber: "+380998765432",
    //         email: "oleg.lytvynenko@example.com"
    //     }
    // },
    // {
    //     ID: 17,
    //     fullName: 'Ольга Морозова Сергіївна',
    //     firstName: 'Ольга',
    //     lastName: 'Морозова',
    //     fatherName: 'Сергіївна',
    //     dob: '1993-08-15',
    //     dom: '2024-04-13',
    //     photo: '/images/person17.jpg',
    //     lastSeenLocation: 'Львів, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '23456789',
    //     bornLocation: 'Львів, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "165",
    //         tpBody: "Повне",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Зелені',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на правій руці'
    //     },
    //     user: {
    //         userID: 17,
    //         phoneNumber: "+380997654321",
    //         email: "olha.morozova@example.com"
    //     }
    // },
    // {
    //     ID: 18,
    //     fullName: 'Володимир Бойко Андрійович',
    //     firstName: 'Володимир',
    //     lastName: 'Бойко',
    //     fatherName: 'Андрійович',
    //     dob: '1981-11-19',
    //     dom: '2024-04-15',
    //     photo: '/images/person18.jpg',
    //     lastSeenLocation: 'Одеса, Україна',
    //     isMilitary: true,
    //     sex: 'Чоловіча',
    //     identificationNumber: '34567890',
    //     bornLocation: 'Одеса, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "180",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Чорні',
    //         clSkin: 'Темний',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Зник безвісти під час прогулянки'
    //     },
    //     user: {
    //         userID: 18,
    //         phoneNumber: "+380996543210",
    //         email: "volodymyr.boyko@example.com"
    //     }
    // },
    // {
    //     ID: 19,
    //     fullName: 'Наталія Дмитренко Олександрівна',
    //     firstName: 'Наталія',
    //     lastName: 'Дмитренко',
    //     fatherName: 'Олександрівна',
    //     dob: '1995-04-22',
    //     dom: '2024-04-17',
    //     photo: '/images/person19.jpg',
    //     lastSeenLocation: 'Харків, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '45678901',
    //     bornLocation: 'Харків, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "160",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Сині',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Зникла під час прогулянки'
    //     },
    //     user: {
    //         userID: 19,
    //         phoneNumber: "+380995432109",
    //         email: "natalia.dmytrenko@example.com"
    //     }
    // },
    // {
    //     ID: 20,
    //     fullName: 'Богдан Кравченко Дмитрович',
    //     firstName: 'Богдан',
    //     lastName: 'Кравченко',
    //     fatherName: 'Дмитрович',
    //     dob: '1989-06-25',
    //     dom: '2024-04-19',
    //     photo: '/images/person20.jpg',
    //     lastSeenLocation: 'Київ, Україна',
    //     isMilitary: false,
    //     sex: 'Чоловіча',
    //     identificationNumber: '56789012',
    //     bornLocation: 'Київ, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "185",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Чорні',
    //         clSkin: 'Темний',
    //         clHair: 'Руде',
    //         tattoo: 'немає',
    //         comment: 'Має родимку на щоці'
    //     },
    //     user: {
    //         userID: 20,
    //         phoneNumber: "+380994321098",
    //         email: "bogdan.kravchenko@example.com"
    //     }
    // },
    // {
    //     ID: 21,
    //     fullName: 'Аліна Гончаренко Олександрівна',
    //     firstName: 'Аліна',
    //     lastName: 'Гончаренко',
    //     fatherName: 'Олександрівна',
    //     dob: '1993-07-19',
    //     dom: '2024-04-21',
    //     photo: '/images/person21.jpg',
    //     lastSeenLocation: 'Львів, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '67890123',
    //     bornLocation: 'Львів, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "170",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Зелені',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на правій руці'
    //     },
    //     user: {
    //         userID: 21,
    //         phoneNumber: "+380993210987",
    //         email: "alina.honcharenko@example.com"
    //     }
    // },
    // {
    //     ID: 22,
    //     fullName: 'Вікторія Коваль Іванівна',
    //     firstName: 'Вікторія',
    //     lastName: 'Коваль',
    //     fatherName: 'Іванівна',
    //     dob: '1987-09-25',
    //     dom: '2024-04-23',
    //     photo: '/images/person22.jpg',
    //     lastSeenLocation: 'Одеса, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '78901234',
    //     bornLocation: 'Одеса, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "160",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Сині',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Зникла під час прогулянки'
    //     },
    //     user: {
    //         userID: 22,
    //         phoneNumber: "+380992109876",
    //         email: "viktoria.koval@example.com"
    //     }
    // },
    // {
    //     ID: 23,
    //     fullName: 'Максим Романенко Петрович',
    //     firstName: 'Максим',
    //     lastName: 'Романенко',
    //     fatherName: 'Петрович',
    //     dob: '1991-11-11',
    //     dom: '2024-04-25',
    //     photo: '/images/person23.jpg',
    //     lastSeenLocation: 'Харків, Україна',
    //     isMilitary: true,
    //     sex: 'Чоловіча',
    //     identificationNumber: '89012345',
    //     bornLocation: 'Харків, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "175",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на лівій руці'
    //     },
    //     user: {
    //         userID: 23,
    //         phoneNumber: "+380991098765",
    //         email: "maksym.romanenko@example.com"
    //     }
    // },
    // {
    //     ID: 24,
    //     fullName: 'Юлія Олексенко Андріївна',
    //     firstName: 'Юлія',
    //     lastName: 'Олексенко',
    //     fatherName: 'Андріївна',
    //     dob: '1994-05-14',
    //     dom: '2024-04-27',
    //     photo: '/images/person24.jpg',
    //     lastSeenLocation: 'Київ, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '90123456',
    //     bornLocation: 'Київ, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "165",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Має татуювання на правій нозі'
    //     },
    //     user: {
    //         userID: 24,
    //         phoneNumber: "+380998123456",
    //         email: "yuliya.olexenko@example.com"
    //     }
    // },
    // {
    //     ID: 25,
    //     fullName: 'Андрій Соколов Олександрович',
    //     firstName: 'Андрій',
    //     lastName: 'Соколов',
    //     fatherName: 'Олександрович',
    //     dob: '1982-01-09',
    //     dom: '2024-04-29',
    //     photo: '/images/person25.jpg',
    //     lastSeenLocation: 'Львів, Україна',
    //     isMilitary: false,
    //     sex: 'Чоловіча',
    //     identificationNumber: '01234567',
    //     bornLocation: 'Львів, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "180",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Сині',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Зник під час поїздки на роботу'
    //     },
    //     user: {
    //         userID: 25,
    //         phoneNumber: "+380997654123",
    //         email: "andriy.sokolov@example.com"
    //     }
    // },
    // {
    //     ID: 26,
    //     fullName: 'Марина Ковальчук Миколаївна',
    //     firstName: 'Марина',
    //     lastName: 'Ковальчук',
    //     fatherName: 'Миколаївна',
    //     dob: '1996-03-22',
    //     dom: '2024-05-01',
    //     photo: '/images/person26.jpg',
    //     lastSeenLocation: 'Одеса, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '12345678',
    //     bornLocation: 'Одеса, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "170",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Зникла під час прогулянки'
    //     },
    //     user: {
    //         userID: 26,
    //         phoneNumber: "+380996543210",
    //         email: "maryna.kovalchuk@example.com"
    //     }
    // },
    // {
    //     ID: 27,
    //     fullName: 'Віталій Черненко Іванович',
    //     firstName: 'Віталій',
    //     lastName: 'Черненко',
    //     fatherName: 'Іванович',
    //     dob: '1998-12-30',
    //     dom: '2024-05-03',
    //     photo: '/images/person27.jpg',
    //     lastSeenLocation: 'Харків, Україна',
    //     isMilitary: true,
    //     sex: 'Чоловіча',
    //     identificationNumber: '23456789',
    //     bornLocation: 'Харків, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "175",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на лівій руці'
    //     },
    //     user: {
    //         userID: 27,
    //         phoneNumber: "+380995432109",
    //         email: "vitaliy.chernenko@example.com"
    //     }
    // },
    // {
    //     ID: 28,
    //     fullName: 'Катерина Зубенко Петрівна',
    //     firstName: 'Катерина',
    //     lastName: 'Зубенко',
    //     fatherName: 'Петрівна',
    //     dob: '1990-02-14',
    //     dom: '2024-05-05',
    //     photo: '/images/person28.jpg',
    //     lastSeenLocation: 'Київ, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '34567890',
    //     bornLocation: 'Київ, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "160",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Сині',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на правій руці'
    //     },
    //     user: {
    //         userID: 28,
    //         phoneNumber: "+380994321098",
    //         email: "kateryna.zubenko@example.com"
    //     }
    // },
    // {
    //     ID: 29,
    //     fullName: 'Василь Колесник Дмитрович',
    //     firstName: 'Василь',
    //     lastName: 'Колесник',
    //     fatherName: 'Дмитрович',
    //     dob: '1992-10-21',
    //     dom: '2024-05-07',
    //     photo: '/images/person29.jpg',
    //     lastSeenLocation: 'Львів, Україна',
    //     isMilitary: false,
    //     sex: 'Чоловіча',
    //     identificationNumber: '45678901',
    //     bornLocation: 'Львів, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "185",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Чорні',
    //         clSkin: 'Темний',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на шиї'
    //     },
    //     user: {
    //         userID: 29,
    //         phoneNumber: "+380993210987",
    //         email: "vasyl.kolesnyk@example.com"
    //     }
    // },
    // {
    //     ID: 30,
    //     fullName: 'Олена Кузьменко Сергіївна',
    //     firstName: 'Олена',
    //     lastName: 'Кузьменко',
    //     fatherName: 'Сергіївна',
    //     dob: '1997-08-30',
    //     dom: '2024-05-09',
    //     photo: '/images/person30.jpg',
    //     lastSeenLocation: 'Одеса, Україна',
    //     isMilitary: true,
    //     sex: 'Жіноча',
    //     identificationNumber: '56789012',
    //     bornLocation: 'Одеса, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "170",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Зникла під час прогулянки'
    //     },
    //     user: {
    //         userID: 30,
    //         phoneNumber: "+380992109876",
    //         email: "olena.kuzmenko@example.com"
    //     }
    // },
    // {
    //     ID: 31,
    //     fullName: 'Іван Федоренко Андрійович',
    //     firstName: 'Іван',
    //     lastName: 'Федоренко',
    //     fatherName: 'Андрійович',
    //     dob: '1990-11-25',
    //     dom: '2024-05-11',
    //     photo: '/images/person31.jpg',
    //     lastSeenLocation: 'Харків, Україна',
    //     isMilitary: false,
    //     sex: 'Чоловіча',
    //     identificationNumber: '67890123',
    //     bornLocation: 'Харків, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "175",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на лівій руці'
    //     },
    //     user: {
    //         userID: 31,
    //         phoneNumber: "+380991098765",
    //         email: "ivan.fedorenko@example.com"
    //     }
    // },
    // {
    //     ID: 32,
    //     fullName: 'Марія Литвиненко Олександрівна',
    //     firstName: 'Марія',
    //     lastName: 'Литвиненко',
    //     fatherName: 'Олександрівна',
    //     dob: '1985-04-22',
    //     dom: '2024-05-13',
    //     photo: '/images/person32.jpg',
    //     lastSeenLocation: 'Київ, Україна',
    //     isMilitary: false,
    //     sex: 'Жіноча',
    //     identificationNumber: '78901234',
    //     bornLocation: 'Київ, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "165",
    //         tpBody: "Худе",
    //         tpHairstyle: "Довге",
    //         clEyes: 'Сині',
    //         clSkin: 'Світлий',
    //         clHair: 'Біляве',
    //         tattoo: 'немає',
    //         comment: 'Має татуювання на правій нозі'
    //     },
    //     user: {
    //         userID: 32,
    //         phoneNumber: "+380993210987",
    //         email: "mariya.lytvynenko@example.com"
    //     }
    // },
    // {
    //     ID: 33,
    //     fullName: 'Артем Власенко Іванович',
    //     firstName: 'Артем',
    //     lastName: 'Власенко',
    //     fatherName: 'Іванович',
    //     dob: '1991-03-18',
    //     dom: '2024-05-15',
    //     photo: '/images/person33.jpg',
    //     lastSeenLocation: 'Львів, Україна',
    //     isMilitary: false,
    //     sex: 'Чоловіча',
    //     identificationNumber: '01234567',
    //     bornLocation: 'Львів, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "180",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на шиї'
    //     },
    //     user: {
    //         userID: 33,
    //         phoneNumber: "+380992109876",
    //         email: "artem.vlasenko@example.com"
    //     }
    // },
    // {
    //     ID: 34,
    //     fullName: 'Олексій Гаврилюк Сергійович',
    //     firstName: 'Олексій',
    //     lastName: 'Гаврилюк',
    //     fatherName: 'Сергійович',
    //     dob: '1993-08-05',
    //     dom: '2024-05-17',
    //     photo: '/images/person34.jpg',
    //     lastSeenLocation: 'Одеса, Україна',
    //     isMilitary: true,
    //     sex: 'Чоловіча',
    //     identificationNumber: '23456789',
    //     bornLocation: 'Одеса, Україна',
    //     verification: {
    //         verificationMIA: true,
    //         verificationOtherRegistry: true,
    //         verificationContent: true
    //     },
    //     confirmationInfo: {
    //         moderatorName: 'Система',
    //         status: 'accept',
    //         solution: 'Причина не вказана'
    //     },
    //     additionInformation: {
    //         height: "175",
    //         tpBody: "Середнє",
    //         tpHairstyle: "Коротке",
    //         clEyes: 'Карі',
    //         clSkin: 'Світлий',
    //         clHair: 'Чорне',
    //         tattoo: 'немає',
    //         comment: 'Має шрам на лівій руці'
    //     },
    //     user: {
    //         userID: 34,
    //         phoneNumber: "+380995432109",
    //         email: "oleksiy.havryliuk@example.com"
    //     }
    // }
]