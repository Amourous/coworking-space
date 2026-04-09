-- adding arabic translations for cafeteria and spaces
ALTER TABLE public.cafeteria_items ADD COLUMN IF NOT EXISTS name_ar text;
ALTER TABLE public.cafeteria_items ADD COLUMN IF NOT EXISTS description_ar text;

-- Cafeteria items Arabic translation
UPDATE public.cafeteria_items SET name_ar = 'إسبريسو', description_ar = 'إسبريسو غني ومكثف يقدم لك دفعة قوية من الطاقة.' WHERE name = 'Espresso';
UPDATE public.cafeteria_items SET name_ar = 'كابتشينو', description_ar = 'إسبريسو كلاسيكي مع حليب مبخر ورغوة غنية وحريرية.' WHERE name = 'Cappuccino';
UPDATE public.cafeteria_items SET name_ar = 'لاتيه مثلج', description_ar = 'إسبريسو ناعم مع حليب بارد وثلج، مثالي لأيام الحر.' WHERE name = 'Iced Latte';
UPDATE public.cafeteria_items SET name_ar = 'شاي أخضر', description_ar = 'شاي أخضر عضوي مهدئ، غني بمضادات الأكسدة للتركيز.' WHERE name = 'Green Tea';
UPDATE public.cafeteria_items SET name_ar = 'عصير برتقال طازج', description_ar = 'عصير برتقال معصور طازجاً، مليء بفيتامين سي.' WHERE name = 'Fresh Orange Juice';
UPDATE public.cafeteria_items SET name_ar = 'مياه غازية', description_ar = 'مياه معدنية غازية منعشة.' WHERE name = 'Sparkling Water';
UPDATE public.cafeteria_items SET name_ar = 'ساندويتش ديك رومي', description_ar = 'ديك رومي مشوي مع جبن سويسري، خس، ومايونيز محضر بخبرة.' WHERE name = 'Turkey Sandwich';
UPDATE public.cafeteria_items SET name_ar = 'راب خضار', description_ar = 'راب صحي مع حمص، خضروات مشوية، وتتبيلة منعشة.' WHERE name = 'Veggie Wrap';
UPDATE public.cafeteria_items SET name_ar = 'سلطة كينوا', description_ar = 'سلطة خفيفة ومغذية مع كينوا، طماطم كرزية، وصلصة ليمون.' WHERE name = 'Quinoa Salad';
UPDATE public.cafeteria_items SET name_ar = 'كرواسون شوكولاتة', description_ar = 'معجنات فرنسية هشة محشوة بشوكولاتة داكنة غنية.' WHERE name = 'Chocolate Croissant';
UPDATE public.cafeteria_items SET name_ar = 'مكسرات مشكلة', description_ar = 'تشكيلة من المكسرات المحمصة لتزويدك بالطاقة طوال اليوم.' WHERE name = 'Mixed Nuts';
UPDATE public.cafeteria_items SET name_ar = 'براوني نباتي', description_ar = 'براوني شوكولاتة غني ومميز، خالٍ من المنتجات الحيوانية.' WHERE name = 'Vegan Brownie';

-- Add Arabic to Spaces
ALTER TABLE public.spaces ADD COLUMN IF NOT EXISTS name_ar text;
ALTER TABLE public.spaces ADD COLUMN IF NOT EXISTS description_ar text;

UPDATE public.spaces SET name_ar = 'مكتب مشترك أ', description_ar = 'مساحة عمل مفتوحة في طابقنا الرئيسي. ممتازة للعمل الفردي والتشبيك. تتوفر خزائن يومية.' WHERE name = 'Flex Desk A';
UPDATE public.spaces SET name_ar = 'مكتب مشترك ب', description_ar = 'مساحة عمل مفتوحة بجوار النوافذ الكبيرة. ممتازة للعمل الفردي والتشبيك.' WHERE name = 'Flex Desk B';
UPDATE public.spaces SET name_ar = 'مكتب مخصص احترافي', description_ar = 'مكتبك الخاص بك فقط طوال أيام الأسبوع. يحتوي على مكتب أوتوماتيكي قابل للتعديل وخزانة أدراج مؤمنة وشاشة 27 بوصة.' WHERE name = 'Pro Desk';
UPDATE public.spaces SET name_ar = 'كابينة التركيز ١', description_ar = 'كابينة عازلة للصوت ومجهزة بتهوية للتركيز العميق والمكالمات الخاصة الهامة.' WHERE name = 'Focus Pod 1';
UPDATE public.spaces SET name_ar = 'غرفة اجتماعات هادل', description_ar = 'غرفة اجتماعات مثالية لفرق صغيرة. تحتوي على شاشة عرض 55 بوصة ولوح كتابة.' WHERE name = 'The Huddle';
UPDATE public.spaces SET name_ar = 'قاعة مجلس الإدارة', description_ar = 'قاعة اجتماعات متميزة مصممة لللقاءات مع العملاء. مجهزة بأعلى مستوى من تقنيات الاتصال المرئي.' WHERE name = 'The Boardroom';
UPDATE public.spaces SET name_ar = 'مختبر التعاون', description_ar = 'غرفة اجتماعات إبداعية مع أرائك، وكراسي مريحة، وألواح كتابة في كل مكان لجلسات العصف الذهني.' WHERE name = 'Synergy Lab';
UPDATE public.spaces SET name_ar = 'الاستوديو', description_ar = 'مساحة مفتوحة للفعاليات، ورش العمل، والإطلاقات. يمكن تشكيلها بطرق متعددة. يشمل نظام صوت كامل.' WHERE name = 'The Studio';
UPDATE public.spaces SET name_ar = 'الاستراحة', description_ar = 'منطقة مريحة بأرائك وقهوة للاسترخاء بين جلسات العمل المكثفة.' WHERE name = 'The Lounge';
