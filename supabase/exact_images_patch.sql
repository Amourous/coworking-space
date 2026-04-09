-- Precise, accurate image mapping patch
-- These connect to the 100% accurate pictures we just generated locally!

-- CAFETERIA FIXES
UPDATE public.cafeteria_items SET image_url = '/images/accurate_croissant_1775724980019.png' WHERE name = 'Chocolate Croissant';
UPDATE public.cafeteria_items SET image_url = '/images/accurate_espresso_1775725212801.png' WHERE name = 'Espresso';
UPDATE public.cafeteria_items SET image_url = '/images/accurate_wrap_1775725292467.png' WHERE name = 'Veggie Wrap';
UPDATE public.cafeteria_items SET image_url = '/images/accurate_nuts_1775725340255.png' WHERE name = 'Mixed Nuts';

-- SPACES FIXES
UPDATE public.spaces SET image_url = '/images/accurate_huddle_1775725672262.png' WHERE name = 'The Huddle';
UPDATE public.spaces SET image_url = 'https://images.unsplash.com/photo-1510505187635-c3f915729fb1?auto=format&fit=crop&w=800&q=80' WHERE name = 'Synergy Lab';
UPDATE public.spaces SET image_url = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' WHERE name = 'Focus Pod 1';
