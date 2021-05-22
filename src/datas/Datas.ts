import {
  DoctorModel,
  CampaignModel,
  EventModel,
  DepartmentModel,
  DepartmentServiceModel,
  NewsPostModel,
  ImageModel,
  StoryModel,
  MediaModel
} from "../models-demo";

const reviewModels = () =>
  new Array(Math.floor(Math.random() * 10 + 5)).fill({
    user: {
      fullName: "Burcu YILDIZ",
      imageUrl:
        "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/reviewer1.jpg",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  });

export const doctorsList: DoctorModel[] = [
  {
    fullName: "Prof. Dr. Zafer KESKİN",
    title: "Clinic Manager",
    isOnline: true,
    rating: 5,
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/doctor1.jpg",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.`,
    reviews: reviewModels()
  },
  {
    fullName: "Dr. Müge ASLI",
    title: "Family Medicine, Oncology",
    isOnline: true,
    rating: 3.2,
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/doctor2.jpg",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
      
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    reviews: reviewModels()
  },
  {
    fullName: "Dr. Mehmet ENGÜR",
    title: "Dental Hygienist",
    isOnline: false,
    rating: 4.6,
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/doctor3.jpg",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    reviews: reviewModels()
  },
  {
    fullName: "Dr. Begüm ESEN",
    title: "Cardiology",
    isOnline: false,
    rating: 4.5,
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/doctor4.jpg",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    reviews: reviewModels()
  },
  {
    fullName: "Dr. Mert KARATAS",
    title: "Psychosocial",
    isOnline: false,
    rating: 3.6,
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/doctor5.jpg",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    reviews: reviewModels()
  },
  {
    fullName: "Dr. Tuğba BÜYÜKGÖZ",
    title: "Surgery Specialist",
    isOnline: false,
    rating: 5,
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/doctor6.jpg",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    reviews: reviewModels()
  }
];

export const campaignList: CampaignModel[] = [
  {
    title: "New Year Special 10% Discount!",
    shortDescription:
      "Check out our campaign for a happier smile in the new year.",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/campaigns/campaign1.jpg",
    htmlContent: `<p>Yeni yıla girmeden &ouml;nce &quot;<strong>İmplant Tedavisi</strong>&quot;, &quot;<strong>1 G&uuml;nde İmplant</strong>&quot;, &quot;<strong>G&uuml;l&uuml;ş Tasarımı</strong>&quot; ve &quot;<strong>Ortodontik Tedavi | Diş Teli</strong>&quot; tedavilerimizde olmak &uuml;zere fiyatlarımızda <strong>%10</strong> indirim uygulamaktayız.</p>
<p><strong>%10 indirimden</strong> faydalanmak i&ccedil;in kampanya bitiş tarihinden &ouml;nce&nbsp;randevunuzu almayı ve &uuml;cretsiz muayenenizi olmayı unutmayın.</p>      
      `,
    endDate: new Date(2020, 1, 4),
    conditions: [
      "This campaign is valid between 1 November and 30 December 2019.",
      "The campaign can only be used once.",
      "This campaign may be available in all our branches.",
      "You can learn more about our campaign from our branches."
    ]
  },
  {
    title: "Yeni Yıla Özel %10 İndirim!",
    shortDescription:
      "Yeni yılda daha mutlu bir gülüş için kampanyamızı hemen inceleyin.",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/campaigns/campaign2.jpg",
    htmlContent: `<p>Yeni yıla girmeden &ouml;nce &quot;<strong>İmplant Tedavisi</strong>&quot;, &quot;<strong>1 G&uuml;nde İmplant</strong>&quot;, &quot;<strong>G&uuml;l&uuml;ş Tasarımı</strong>&quot; ve &quot;<strong>Ortodontik Tedavi | Diş Teli</strong>&quot; tedavilerimizde olmak &uuml;zere fiyatlarımızda <strong>%10</strong> indirim uygulamaktayız.</p>
<p><strong>%10 indirimden</strong> faydalanmak i&ccedil;in kampanya bitiş tarihinden &ouml;nce&nbsp;randevunuzu almayı ve &uuml;cretsiz muayenenizi olmayı unutmayın.</p>      
<p>Unutmayın, mutlu olmak sizin elinizde.</p>
      `,
    endDate: new Date(2020, 1, 10),
    conditions: [
      "Bu kampanya 1 Kasım ile 30 Aralık 2019 tarihleri arasında geçerlidir.",
      "Kampanyadan sadece tek sefer yararlanılabilir.",
      "Bu kampanya tüm şubelerimizde geçerlidir.",
      "Kampanya hakkında daha fazla bilgiyi şubelerimizden öğrenebilirsiniz."
    ]
  },
  {
    title: "Yeni Yıla Özel %10 İndirim!",
    shortDescription:
      "Yeni yılda daha mutlu bir gülüş için kampanyamızı hemen inceleyin.",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/campaigns/campaign3.jpg",
    htmlContent: `<p>Yeni yıla girmeden &ouml;nce &quot;<strong>İmplant Tedavisi</strong>&quot;, &quot;<strong>1 G&uuml;nde İmplant</strong>&quot;, &quot;<strong>G&uuml;l&uuml;ş Tasarımı</strong>&quot; ve &quot;<strong>Ortodontik Tedavi | Diş Teli</strong>&quot; tedavilerimizde olmak &uuml;zere fiyatlarımızda <strong>%10</strong> indirim uygulamaktayız.</p>
<p><strong>%10 indirimden</strong> faydalanmak i&ccedil;in kampanya bitiş tarihinden &ouml;nce&nbsp;randevunuzu almayı ve &uuml;cretsiz muayenenizi olmayı unutmayın.</p>      
<p>Unutmayın, mutlu olmak sizin elinizde.</p>
      `,
    endDate: new Date(2020, 2, 31),
    conditions: [
      "Bu kampanya 1 Kasım ile 30 Aralık 2019 tarihleri arasında geçerlidir.",
      "Kampanyadan sadece tek sefer yararlanılabilir.",
      "Bu kampanya tüm şubelerimizde geçerlidir.",
      "Kampanya hakkında daha fazla bilgiyi şubelerimizden öğrenebilirsiniz."
    ]
  },
  {
    title: "Yeni Yıla Özel %10 İndirim!",
    shortDescription:
      "Yeni yılda daha mutlu bir gülüş için kampanyamızı hemen inceleyin.",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/campaigns/campaign4.jpg",
    htmlContent: `<p>Yeni yıla girmeden &ouml;nce &quot;<strong>İmplant Tedavisi</strong>&quot;, &quot;<strong>1 G&uuml;nde İmplant</strong>&quot;, &quot;<strong>G&uuml;l&uuml;ş Tasarımı</strong>&quot; ve &quot;<strong>Ortodontik Tedavi | Diş Teli</strong>&quot; tedavilerimizde olmak &uuml;zere fiyatlarımızda <strong>%10</strong> indirim uygulamaktayız.</p>
<p><strong>%10 indirimden</strong> faydalanmak i&ccedil;in kampanya bitiş tarihinden &ouml;nce&nbsp;randevunuzu almayı ve &uuml;cretsiz muayenenizi olmayı unutmayın.</p>      
<p>Unutmayın, mutlu olmak sizin elinizde.</p>
      `,
    endDate: new Date(2020, 3, 31),
    conditions: [
      "Bu kampanya 1 Kasım ile 30 Aralık 2019 tarihleri arasında geçerlidir.",
      "Kampanyadan sadece tek sefer yararlanılabilir.",
      "Bu kampanya tüm şubelerimizde geçerlidir.",
      "Kampanya hakkında daha fazla bilgiyi şubelerimizden öğrenebilirsiniz."
    ]
  }
];

export const eventList: EventModel[] = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/500x500?text=event"
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/500x500?text=event"
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/500x500?text=event"
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/500x500?text=event"
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/500x500?text=event"
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://via.placeholder.com/500x500?text=event"
  }
];

export const departmentServices: DepartmentServiceModel[] = [
  {
    title: "Ophthalmology",
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been the industry's standard."
  },
  {
    title: "Pediatric Clinic",
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been the industry's standard."
  },
  {
    title: "Dental Care",
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been the industry's standard."
  },
  {
    title: "Laryngological Clinic",
    shortDescription:
      "Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been the industry's standard."
  }
];

export const newsPosts: NewsPostModel[] = [
  {
    title: "Get the right care based on your individual needs.",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/news1.jpg",
    createdDate: new Date()
  },
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/news2.jpg",
    createdDate: new Date()
  },
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/news3.jpg",
    createdDate: new Date()
  }
];

const departmentImages: ImageModel[] = [
  {
    description: "Description 1",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment1_1.jpg"
  },
  {
    description: "Description 2",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment1_2.jpg"
  },
  {
    description: "Description 3",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment1_3.jpg"
  },
  {
    description: "Description 4",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment2.png"
  },
  {
    description: "Description 5",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/dentist-demo/assets/images/treatments/treatment3.jpg"
  }
];

export const departmentList: DepartmentModel[] = [
  {
    title: "Cardiology",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/department1.jpg",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    departmentServices,
    newsPosts,
    images: departmentImages
  },
  {
    title: "Neurology",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/department2.jpg",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    shortDescription:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    departmentServices,
    newsPosts,
    images: departmentImages
  },
  {
    title: "Surgery",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/department3.jpg",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    shortDescription:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    departmentServices,
    newsPosts,
    images: departmentImages
  },
  {
    title: "Dental",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/department4.jpg",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    shortDescription:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    departmentServices,
    newsPosts,
    images: departmentImages
  },
  {
    title: "Radiology",
    imageUrl:
      "https://github.com/publsoft/publsoft.github.io/raw/master/projects/medical-demo/assets/images/department5.jpg",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    departmentServices,
    newsPosts,
    images: departmentImages
  }
];

export const storyList: StoryModel[] = [
  {
    imageUrl:
      "https://image.shutterstock.com/image-photo/young-woman-taking-self-portrait-260nw-702198103.jpg"
  },
  {
    imageUrl:
      "https://image.shutterstock.com/image-photo/photographer-taking-picture-nature-on-260nw-567398461.jpg"
  },
  {
    imageUrl:
      "https://image.shutterstock.com/image-photo/photographer-black-jacket-taking-photo-260nw-1009966321.jpg"
  },
  {
    imageUrl:
      "https://image.shutterstock.com/image-photo/relaxing-along-beach-260nw-564422659.jpg"
  },
  {
    imageUrl:
      "https://image.shutterstock.com/image-photo/picture-one-beautiful-young-chinese-260nw-718740343.jpg"
  },
  {
    imageUrl:
      "https://image.shutterstock.com/image-photo/young-woman-taking-self-portrait-260nw-702198103.jpg"
  }
];

export const mediaList: MediaModel[] = [
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    imageUrl:
      "https://image.shutterstock.com/image-photo/hospital-medical-education-health-care-260nw-283871402.jpg",
    isLive: true,
    startedDate: new Date(),
    doctor: doctorsList[0],
    tags: ["#doctor", "#media", "#live", "#cam", "#social"]
  },
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    imageUrl:
      "https://image.shutterstock.com/image-photo/medical-education-health-care-people-260nw-588870059.jpg",
    isLive: true,
    startedDate: new Date(),
    doctor: doctorsList[0],
    tags: ["#doctor", "#media", "#live", "#cam", "#social"]
  },
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    htmlContent:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    imageUrl:
      "https://image.shutterstock.com/image-photo/hospital-medical-education-health-care-260nw-283871402.jpg",
    isLive: true,
    startedDate: new Date(),
    doctor: doctorsList[0],
    tags: ["#doctor", "#media", "#live", "#cam", "#social"]
  }
];
