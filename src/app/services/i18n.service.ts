import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'mk';

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  'nav.home': { en: 'Home', mk: 'Дома' },
  'nav.gallery': { en: 'Apartments', mk: 'Апартмани' },
  'nav.book': { en: 'Book', mk: 'Резервирај' },
  'nav.contact': { en: 'Contact', mk: 'Контакт' },
  'nav.about': { en: 'About', mk: 'За нас' },
  'nav.market': { en: 'Market', mk: 'Маркет' },
  'nav.viber': { en: 'Viber Us', mk: 'Viber' },
  'nav.callUs': { en: 'Call Us', mk: 'Јави се' },
  'nav.more': { en: 'More', mk: 'Повеќе' },

  // Hero
  'hero.badge': { en: 'Ohrid, North Macedonia', mk: 'Охрид, Северна Македонија' },
  'hero.title': { en: 'Relax. Enjoy.', mk: 'Релаксирај. Уживај.' },
  'hero.subtitle': { en: 'Perfect place for your vacation.', mk: 'Идеално место за твојот одмор.' },
  'hero.description': { en: 'Apartments with lake & mountain views, pool access, and all the comforts of home.', mk: 'Апартмани со поглед на езерото и планините, базен и сите удобности на дом.' },
  'hero.bookBtn': { en: 'Book Your Stay', mk: 'Резервирај' },
  'hero.viberBtn': { en: 'Chat on Viber', mk: 'Пишете на Viber' },
  'hero.apartments': { en: 'Apartments', mk: 'Апартмани' },
  'hero.guestCapacity': { en: 'Guest Capacity', mk: 'Капацитет' },
  'hero.fromCenter': { en: 'From City Center', mk: 'Од центар' },

  // Apartments section
  'apartments.title': { en: 'Our Apartments', mk: 'Наши Апартмани' },
  'apartments.subtitle': { en: 'From cozy lakeside studios to spacious family suites - find your perfect stay.', mk: 'Од мали студија до семејни апартмани - пронајдете го вашиот идеален престој.' },
  'apartments.viewAll': { en: 'View All Apartments', mk: 'Погледни ги сите' },

  // Amenities
  'amenities.title': { en: 'What We Offer', mk: 'Што нудиме' },
  'amenities.subtitle': { en: 'Everything you need for a comfortable and memorable stay.', mk: 'Сè што ви треба за удобен и незаборавен престој.' },
  'amenities.wifi': { en: 'Free WiFi', mk: 'Бесплатен WiFi' },
  'amenities.parking': { en: 'Free Parking', mk: 'Бесплатен Паркинг' },
  'amenities.pool': { en: 'Pool Access', mk: 'Пристап до базен' },
  'amenities.ac': { en: 'Air Conditioning', mk: 'Клима' },
  'amenities.kitchen': { en: 'Full Kitchen', mk: 'Целосна кујна' },
  'amenities.tv': { en: 'Flat-screen TV', mk: 'ТВ' },
  'amenities.balcony': { en: 'Balcony', mk: 'Балкон' },
  'amenities.market': { en: 'On-site Market', mk: 'Маркет во круг' },

  // Market promo
  'market.title': { en: 'Diamond Market', mk: 'Diamond Market' },
  'market.description': { en: 'Your on-site grocery store. Fresh produce, pantry staples, snacks, and essentials - right at your doorstep.', mk: 'Вашата продавница во круг. Свежи производи, грицки и основни потреби - директно пред вашата врата.' },
  'market.visitBtn': { en: 'Visit Market', mk: 'Посети маркет' },
  'market.browseBtn': { en: 'Browse Products', mk: 'Разгледај производи' },
  'market.popular': { en: 'Popular Items', mk: 'Популарни производи' },
  'market.popularSub': { en: 'Check out some of our guest favorites.', mk: 'Погледнете ги омилените на нашите гости.' },
  'market.viewCatalog': { en: 'View Full Catalog', mk: 'Целосен каталог' },
  'market.convenience': { en: 'Convenience at Your Doorstep', mk: 'Удобност пред вашата врата' },
  'market.convDesc1': { en: 'Diamond Market is located right within the Park Diamond Apartments complex, eliminating the need for distant grocery runs.', mk: 'Diamond Market се наоѓа во рамките на комплексот Park Diamond Apartments, без потреба од оддалечени набавки.' },
  'market.convDesc2': { en: 'We stock fresh fruits, vegetables, dairy products, bakery items, pantry staples, snacks, beverages, and essential household items.', mk: 'Нудиме свежо овошје, зеленчук, млечни производи, пекарски производи, грицки, пијалоци и основни домакински потреби.' },
  'market.openDaily': { en: 'Open daily for our guests', mk: 'Отворено секој ден за гости' },
  'market.freshProduce': { en: 'Fresh produce & pantry essentials', mk: 'Свежи производи и основни потреби' },
  'market.competitive': { en: 'Competitive prices', mk: 'Конкурентни цени' },
  'market.stepsAway': { en: 'Steps from your apartment', mk: 'Чекори од вашиот апартман' },
  'market.lookingAccom': { en: 'Looking for Accommodation?', mk: 'Барате сместување?' },
  'market.accomDesc': { en: 'Diamond Market is part of Park Diamond Apartments - apartments with lake & mountain views in Ohrid.', mk: 'Diamond Market е дел од Park Diamond Apartments - апартмани со поглед на езерото и планините во Охрид.' },
  'market.viewApartments': { en: 'View Apartments', mk: 'Погледни апартмани' },
  'market.heroDesc': { en: 'Your on-site neighborhood market for fresh, healthy foods and everyday essentials.', mk: 'Вашиот маркет за свежа, здрава храна и секојдневни потреби.' },

  // CTA
  'cta.title': { en: 'Ready for Your Ohrid Getaway?', mk: 'Подготвени за одмор во Охрид?' },
  'cta.subtitle': { en: 'Contact us on Viber for instant availability and the best rates.', mk: 'Контактирајте нè на Viber за моментална достапност и најдобри цени.' },
  'cta.bookOnline': { en: 'Book Online', mk: 'Резервирај онлајн' },

  // Gallery page
  'gallery.title': { en: 'Our Apartments', mk: 'Наши Апартмани' },
  'gallery.subtitle': { en: 'Browse and filter to find your perfect stay.', mk: 'Пребарајте и филтрирајте за идеален престој.' },
  'gallery.filterView': { en: 'View', mk: 'Поглед' },
  'gallery.filterCapacity': { en: 'Guests', mk: 'Гости' },
  'gallery.filterAll': { en: 'All', mk: 'Сите' },
  'gallery.filterLake': { en: 'Lake View', mk: 'Езерски' },
  'gallery.filterMountain': { en: 'Mountain View', mk: 'Планински' },
  'gallery.filterPool': { en: 'Pool & Lake', mk: 'Базен' },
  'gallery.cap2': { en: '1–2', mk: '1–2' },
  'gallery.cap34': { en: '3–4', mk: '3–4' },
  'gallery.cap5': { en: '5+', mk: '5+' },
  'gallery.inquire': { en: 'Inquire on Viber', mk: 'Прашај на Viber' },
  'gallery.viewDetails': { en: 'View Details', mk: 'Погледни детали' },
  'gallery.backToAll': { en: 'All Apartments', mk: 'Сите апартмани' },
  'gallery.guests': { en: 'guests', mk: 'гости' },
  'gallery.amenitiesTitle': { en: 'Amenities & Features', mk: 'Удобности и карактеристики' },
  'gallery.allPhotos': { en: 'All Photos', mk: 'Сите фотографии' },
  'gallery.interested': { en: 'Interested in this apartment?', mk: 'Ве интересира овој апартман?' },
  'gallery.interestedDesc': { en: 'Contact us directly for availability and best rates.', mk: 'Контактирајте нè директно за достапност и најдобри цени.' },
  'gallery.notFound': { en: 'Apartment not found', mk: 'Апартманот не е пронајден' },

  // Booking page
  'booking.title': { en: 'Book Your Stay', mk: 'Резервирајте го вашиот престој' },
  'booking.subtitle': { en: 'Fill out the inquiry form or contact us directly on Viber for instant response.', mk: 'Пополнете го формуларот или контактирајте нè директно на Viber за брз одговор.' },
  'booking.name': { en: 'Full Name', mk: 'Целосно име' },
  'booking.namePlaceholder': { en: 'Your full name', mk: 'Вашето целосно име' },
  'booking.email': { en: 'Email', mk: 'Е-пошта' },
  'booking.phone': { en: 'Phone', mk: 'Телефон' },
  'booking.guests': { en: 'Number of Guests', mk: 'Број на гости' },
  'booking.checkin': { en: 'Check-in', mk: 'Пристигнување' },
  'booking.checkout': { en: 'Check-out', mk: 'Заминување' },
  'booking.special': { en: 'Special Request', mk: 'Посебно барање' },
  'booking.specialPlaceholder': { en: 'Any special requests or questions...', mk: 'Посебни барања или прашања...' },
  'booking.sendInquiry': { en: 'Send Inquiry', mk: 'Испрати барање' },
  'booking.note': { en: 'This is a non-binding inquiry. We will confirm availability via email.', mk: 'Ова е необврзувачко барање. Ќе ви ја потврдиме достапноста преку е-пошта.' },
  'booking.sent': { en: 'Inquiry Sent!', mk: 'Барањето е испратено!' },
  'booking.sentMsg': { en: "Thank you for your interest. We'll get back to you within 24 hours with availability and pricing.", mk: 'Ви благодариме за интересот. Ќе ви одговориме во рок од 24 часа со достапност и цени.' },
  'booking.quickContact': { en: 'Quick Contact', mk: 'Брз контакт' },
  'booking.quickContactDesc': { en: 'For instant response and availability, message us directly on Viber.', mk: 'За моментален одговор и достапност, пишете ни директно на Viber.' },
  'booking.whyDirect': { en: 'Why Book Direct?', mk: 'Зошто директно?' },
  'booking.bestPrice': { en: 'Best price guarantee', mk: 'Гарантирана најдобра цена' },
  'booking.flexCancel': { en: 'Flexible cancellation', mk: 'Флексибилно откажување' },
  'booking.freePool': { en: 'Free pool access', mk: 'Бесплатен базен' },
  'booking.freeParking': { en: 'Free parking', mk: 'Бесплатен паркинг' },
  'booking.personalHelp': { en: 'Personal assistance', mk: 'Лична помош' },
  'booking.alsoFind': { en: 'Also Find Us On', mk: 'Најдете нè и на' },

  // Contact page
  'contact.title': { en: 'Get in Touch', mk: 'Контактирајте нè' },
  'contact.subtitle': { en: "We'd love to hear from you. Reach out through any of these channels.", mk: 'Со задоволство ќе ви одговориме. Контактирајте нè преку било кој канал.' },
  'contact.viber': { en: 'Viber', mk: 'Viber' },
  'contact.instant': { en: 'Instant response', mk: 'Моментален одговор' },
  'contact.chatNow': { en: 'Chat Now', mk: 'Пиши сега' },
  'contact.reception': { en: 'Reception', mk: 'Рецепција' },
  'contact.call': { en: 'Call', mk: 'Јави се' },
  'contact.privateLine': { en: 'Private Line', mk: 'Приватна линија' },
  'contact.emailLabel': { en: 'Email', mk: 'Е-пошта' },
  'contact.sendEmail': { en: 'Send Email', mk: 'Испрати' },
  'contact.bookingCom': { en: 'Booking.com', mk: 'Booking.com' },
  'contact.bookReview': { en: 'Book & review', mk: 'Резервирај и оцени' },
  'contact.visit': { en: 'Visit', mk: 'Посети' },
  'contact.location': { en: 'Location', mk: 'Локација' },
  'contact.fromCenter': { en: '3km from city center', mk: '3км од центар' },
  'contact.sendMessage': { en: 'Send a Message', mk: 'Испратете порака' },
  'contact.namePlaceholder': { en: 'Your name', mk: 'Вашето име' },
  'contact.messagePlaceholder': { en: 'How can we help you?', mk: 'Како можеме да ви помогнеме?' },
  'contact.sendBtn': { en: 'Send Message', mk: 'Испрати порака' },
  'contact.messageSent': { en: "Message sent! We'll get back to you soon.", mk: 'Пораката е испратена! Наскоро ќе ви одговориме.' },
  'contact.findUs': { en: 'Find Us', mk: 'Пронајдете нè' },
  'contact.name': { en: 'Name', mk: 'Име' },
  'contact.message': { en: 'Message', mk: 'Порака' },

  // About page
  'about.title': { en: 'About Park Diamond', mk: 'За Park Diamond' },
  'about.subtitle': { en: 'Your home away from home on the shores of Lake Ohrid.', mk: 'Вашиот дом далеку од дома на брегот на Охридското Езеро.' },
  'about.ourStory': { en: 'Our Story', mk: 'Нашата приказна' },
  'about.story1': { en: 'Park Diamond Apartments started in <strong>2017</strong> as part of the Hotel Park complex in Ohrid. Since then, we\'ve grown into one of Ohrid\'s premier accommodation destinations.', mk: 'Park Diamond Apartments започнаа во <strong>2017</strong> како дел од комплексот Hotel Park во Охрид. Оттогаш, прераснавме во една од водечките дестинации за сместување во Охрид.' },
  'about.story2': { en: 'In <strong>2022</strong>, we expanded significantly - adding new apartments, launching the Diamond Market on-site grocery store, and introducing ATV rental services for adventurous guests.', mk: 'Во <strong>2022</strong>, значително се проширивме - додавајќи нови апартмани, отворајќи ја продавницата Diamond Market и воведувајќи услуги за изнајмување на ATV за авантуристички гости.' },
  'about.story3': { en: 'Today in <strong>2025</strong>, we proudly offer <strong>fully equipped apartments</strong> with capacity for over <strong>35 guests</strong>, located just 3 km from Ohrid city center.', mk: 'Денес во <strong>2025</strong>, со гордост нудиме <strong>целосно опремени апартмани</strong> со капацитет за над <strong>35 гости</strong>, лоцирани на само 3 км од центарот на Охрид.' },
  'about.beginning': { en: 'The Beginning', mk: 'Почетокот' },
  'about.beginningDesc': { en: 'Started in the Hotel Park complex', mk: 'Започнавме во комплексот Hotel Park' },
  'about.expansion': { en: 'Major Expansion', mk: 'Големо проширување' },
  'about.expansionDesc': { en: 'Added apartments, Diamond Market, and ATV rentals', mk: 'Додадовме апартмани, Diamond Market и ATV изнајмување' },
  'about.today': { en: 'Today', mk: 'Денес' },
  'about.todayDesc': { en: '70+ guest capacity, full-service destination', mk: '70+ капацитет, целосна дестинација' },
  'about.services': { en: 'Our Services', mk: 'Наши услуги' },
  'about.servicesSubtitle': { en: 'More than just accommodation - a complete vacation experience.', mk: 'Повеќе од само сместување - целосно искуство за одмор.' },
  'about.aptDesc': { en: 'Fully equipped apartments with lake & mountain views, pool access, free WiFi and parking.', mk: 'Целосно опремени апартмани со поглед на езерото и планините, базен, бесплатен WiFi и паркинг.' },
  'about.viewApt': { en: 'View Apartments', mk: 'Погледни апартмани' },
  'about.marketDesc': { en: 'On-site grocery store with fresh produce, pantry staples, snacks, and everyday essentials.', mk: 'Продавница со свежи производи, грицки и секојдневни потреби.' },
  'about.visitMarket': { en: 'Visit Market', mk: 'Посети маркет' },
  'about.atvDesc': { en: 'Explore the beautiful Ohrid countryside with our ATV rental service - guided tours available.', mk: 'Истражете ја прекрасната охридска околина со нашата услуга за ATV - достапни се водени тури.' },
  'about.activities': { en: 'Activities & Experiences', mk: 'Активности и искуства' },
  'about.activitiesSubtitle': { en: 'We can arrange a variety of activities for your perfect vacation.', mk: 'Можеме да организираме разновидни активности за вашиот совршен одмор.' },
  'about.bicycle': { en: 'Bicycle Rental', mk: 'Изнајмување велосипед' },
  'about.carRental': { en: 'Car Rental', mk: 'Изнајмување автомобил' },
  'about.paragliding': { en: 'Paragliding', mk: 'Параглајдинг' },
  'about.waterAct': { en: 'Water Activities', mk: 'Водени активности' },
  'about.massages': { en: 'Massages', mk: 'Масажи' },
  'about.jeepSafaris': { en: 'Jeep Safaris', mk: 'Џип сафари' },
  'about.catamaran': { en: 'Catamaran Tours', mk: 'Катамаран тури' },
  'about.atv': { en: 'ATV Tours', mk: 'ATV тури' },

  // Footer
  'footer.tagline': { en: 'Relax. Enjoy. Your perfect vacation destination in Ohrid.', mk: 'Релаксирај. Уживај. Вашата идеална дестинација за одмор во Охрид.' },
  'footer.quickLinks': { en: 'Quick Links', mk: 'Брзи линкови' },
  'footer.bookStay': { en: 'Book Your Stay', mk: 'Резервирај престој' },
  'footer.contact': { en: 'Contact', mk: 'Контакт' },
  'footer.aboutUs': { en: 'About Us', mk: 'За нас' },
  'footer.diamondMarket': { en: 'Diamond Market', mk: 'Diamond Market' },
  'footer.contactTitle': { en: 'Contact', mk: 'Контакт' },
  'footer.findUs': { en: 'Find Us', mk: 'Пронајдете нè' },
  'footer.rights': { en: 'All rights reserved.', mk: 'Сите права се задржани.' },
  'footer.websiteBy': { en: 'Website by', mk: 'Веб-страна од' },

  // Market catalog
  'catalog.title': { en: 'Product Catalog', mk: 'Каталог на производи' },
  'catalog.subtitle': { en: 'Browse our full selection of products.', mk: 'Разгледајте ја нашата целосна понуда.' },
  'catalog.search': { en: 'Search products...', mk: 'Пребарувај производи...' },
  'catalog.all': { en: 'All', mk: 'Сите' },
  'catalog.noResults': { en: 'No products found', mk: 'Нема пронајдени производи' },
  'catalog.tryDifferent': { en: 'Try a different search or category.', mk: 'Пробајте со друго пребарување или категорија.' },

  // Apartment names
  'apt.s-apartment.name': { en: 'S Apartment', mk: 'S Апартман' },
  'apt.m-apartment.name': { en: 'M Apartment', mk: 'M Апартман' },
  'apt.xl-lakeside.name': { en: 'XL Lakeside Apartment', mk: 'XL Апартман Езерски' },
  'apt.xl-mountain.name': { en: 'XL Mountain View', mk: 'XL Планински Поглед' },
  'apt.mountain-suite.name': { en: 'Mountain Suite', mk: 'Планински Апартман' },
  'apt.superior-pool.name': { en: 'Superior Pool View', mk: 'Супериор Базенски Поглед' },
  'apt.xxl-lakeside.name': { en: 'XXL Lakeside View', mk: 'XXL Езерски Поглед' },
  'apt.xl-lake-2.name': { en: 'XL Lake View 2', mk: 'XL Езерски Поглед 2' },
  'apt.xxl-lake-2.name': { en: 'XXL Lake View 2', mk: 'XXL Езерски Поглед 2' },
  'apt.xxl-pool-ground.name': { en: 'XXL Pool & Lake Ground', mk: 'XXL Базен и Езеро Приземје' },
  'apt.l-mountain.name': { en: 'L Mountain View', mk: 'L Планински Поглед' },

  // Apartment subtitles (view types)
  'apt.view.lakeside': { en: 'Lakeside View', mk: 'Езерски Поглед' },
  'apt.view.lake': { en: 'Lake View', mk: 'Поглед на Езеро' },
  'apt.view.mountain': { en: 'Mountain View', mk: 'Планински Поглед' },
  'apt.view.poolLake': { en: 'Pool & Lake View', mk: 'Базен и Езеро' },

  // Apartment descriptions
  'apt.s-apartment.desc': { en: 'Experience a serene lakeside getaway in our cozy apartment for two. This small one-room apartment offers a peaceful lakeside view, perfect for a romantic escape.', mk: 'Доживејте мирен одмор покрај езерото во нашиот удобен апартман за двајца. Овој мал еднособен апартман нуди мирен поглед на езерото, идеален за романтично бегство.' },
  'apt.m-apartment.desc': { en: 'Medium-sized apartment with a double bed and extra sleeping arrangement. Enjoy beautiful lake views from your comfortable retreat.', mk: 'Среден апартман со двоен кревет и дополнително место за спиење. Уживајте во прекрасен поглед на езерото од вашето удобно засолниште.' },
  'apt.xl-lakeside.desc': { en: 'Two-bedroom apartment with a fully equipped kitchen and stunning lake views. Extra bed option available for added flexibility.', mk: 'Двособен апартман со целосно опремена кујна и прекрасен поглед на езерото. Можност за дополнителен кревет за поголема флексибилност.' },
  'apt.xl-mountain.desc': { en: 'Two-room ground floor apartment with mountain views and a spacious terrace. Perfect for families or groups.', mk: 'Двособен приземен апартман со планински поглед и пространа тераса. Идеален за семејства или групи.' },
  'apt.mountain-suite.desc': { en: 'Budget-friendly one-room apartment with two single beds and extra bed option. Enjoy beautiful mountain vistas from your window.', mk: 'Поволен еднособен апартман со два единечни кревети и можност за дополнителен кревет. Уживајте во прекрасни планински погледи од вашиот прозорец.' },
  'apt.superior-pool.desc': { en: 'Two-room apartment with a stunning pool view balcony, near the lake. Ideal for those who want the best of both views.', mk: 'Двособен апартман со прекрасен балкон со поглед на базен, близу езерото. Идеален за оние кои сакаат најдобро од двата погледа.' },
  'apt.xxl-lakeside.desc': { en: 'Large apartment with a separate living room, fully equipped kitchen, and private terrace overlooking the lake.', mk: 'Голем апартман со одвоена дневна соба, целосно опремена кујна и приватна тераса со поглед на езерото.' },
  'apt.xl-lake-2.desc': { en: 'Spacious layout with a cozy bed, stylish interiors, and a beautiful balcony overlooking the lake.', mk: 'Простран распоред со удобен кревет, стилски ентериер и прекрасен балкон со поглед на езерото.' },
  'apt.xxl-lake-2.desc': { en: 'Elegant apartment with well-lit interior, modern furnishings, and a spacious terrace with lake views.', mk: 'Елегантен апартман со светол ентериер, модерен мебел и пространа тераса со поглед на езерото.' },
  'apt.xxl-pool-ground.desc': { en: 'Ground floor apartment with pool and lake views, fully equipped kitchen, and large living area.', mk: 'Приземен апартман со поглед на базен и езеро, целосно опремена кујна и голема дневна соба.' },
  'apt.l-mountain.desc': { en: 'Ground floor apartment with kitchen, living area, and bedroom. Kitchenette with essentials and beautiful mountain vistas.', mk: 'Приземен апартман со кујна, дневна соба и спална. Кујна со основни потреби и прекрасни планински погледи.' },

  // Amenities (translatable)
  'amenity.ac': { en: 'Air Conditioning', mk: 'Клима уред' },
  'amenity.kitchenette': { en: 'Kitchenette', mk: 'Мала кујна' },
  'amenity.balcony': { en: 'Balcony', mk: 'Балкон' },
  'amenity.bathroom': { en: 'Private Bathroom', mk: 'Приватна бања' },
  'amenity.wifi': { en: 'Free WiFi', mk: 'Бесплатен WiFi' },
  'amenity.parking': { en: 'Free Parking', mk: 'Бесплатен паркинг' },
  'amenity.pool': { en: 'Pool Access', mk: 'Пристап до базен' },
  'amenity.tv': { en: 'Flat-screen TV', mk: 'ТВ со рамен екран' },
  'amenity.kitchen': { en: 'Kitchen', mk: 'Кујна' },
  'amenity.fullKitchen': { en: 'Full Kitchen', mk: 'Целосна кујна' },
  'amenity.wardrobe': { en: 'Wardrobe', mk: 'Гардероба' },
  'amenity.terrace': { en: 'Terrace', mk: 'Тераса' },
  'amenity.privateTerrace': { en: 'Private Terrace', mk: 'Приватна тераса' },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<Lang>(this.getInitialLang());

  private getInitialLang(): Lang {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('pd-lang');
      if (saved === 'en' || saved === 'mk') return saved;
    }
    return 'en';
  }

  toggleLang() {
    const next: Lang = this.lang() === 'en' ? 'mk' : 'en';
    this.lang.set(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('pd-lang', next);
    }
  }

  setLang(lang: Lang) {
    this.lang.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('pd-lang', lang);
    }
  }

  t(key: string): string {
    const entry = translations[key];
    if (!entry) return key;
    return entry[this.lang()] || entry['en'] || key;
  }
}
