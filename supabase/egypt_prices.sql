-- Convert all prices from USD to EGP (Egyptian Pounds)
-- Approximate conversion: realistic Egyptian coworking market rates

-- SPACES: Update hourly and daily prices to EGP
UPDATE public.spaces SET price_hourly = 50, price_daily = 300 WHERE name = 'Flex Desk A';
UPDATE public.spaces SET price_hourly = 50, price_daily = 300 WHERE name = 'Flex Desk B';
UPDATE public.spaces SET price_hourly = 100, price_daily = 600 WHERE name = 'Pro Desk';
UPDATE public.spaces SET price_hourly = 75, price_daily = 450 WHERE name = 'Focus Pod 1';
UPDATE public.spaces SET price_hourly = 200, price_daily = NULL WHERE name = 'The Huddle';
UPDATE public.spaces SET price_hourly = 400, price_daily = NULL WHERE name = 'The Boardroom';
UPDATE public.spaces SET price_hourly = 300, price_daily = NULL WHERE name = 'Synergy Lab';
UPDATE public.spaces SET price_hourly = 600, price_daily = NULL WHERE name = 'The Studio';
UPDATE public.spaces SET price_hourly = NULL, price_daily = 0 WHERE name = 'The Lounge';

-- CAFETERIA: Update prices to EGP
UPDATE public.cafeteria_items SET price = 35 WHERE name = 'Espresso';
UPDATE public.cafeteria_items SET price = 55 WHERE name = 'Cappuccino';
UPDATE public.cafeteria_items SET price = 65 WHERE name = 'Iced Latte';
UPDATE public.cafeteria_items SET price = 40 WHERE name = 'Green Tea';
UPDATE public.cafeteria_items SET price = 60 WHERE name = 'Fresh Orange Juice';
UPDATE public.cafeteria_items SET price = 30 WHERE name = 'Sparkling Water';
UPDATE public.cafeteria_items SET price = 95 WHERE name = 'Turkey Sandwich';
UPDATE public.cafeteria_items SET price = 85 WHERE name = 'Veggie Wrap';
UPDATE public.cafeteria_items SET price = 100 WHERE name = 'Quinoa Salad';
UPDATE public.cafeteria_items SET price = 45 WHERE name = 'Chocolate Croissant';
UPDATE public.cafeteria_items SET price = 55 WHERE name = 'Mixed Nuts';
UPDATE public.cafeteria_items SET price = 50 WHERE name = 'Vegan Brownie';
