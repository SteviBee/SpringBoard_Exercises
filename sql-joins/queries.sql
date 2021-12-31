-- write your queries here
-- 1
SELECT * FROM owners o 
FULL JOIN vehicles ON vehicles.owner_id = o.id;   

-- 2 
SELECT o.first_name, o.last_name, COUNT(*) FROM owners o 
JOIN vehicles ON vehicles.owner_id = o.id
GROUP BY o.first_name, o.last_name
ORDER BY o.first_name;

-- 3
SELECT o.first_name, o.last_name, AVG(v.price), COUNT(*) FROM owners o 
JOIN vehicles v ON v.owner_id = o.id
GROUP BY o.first_name, o.last_name
HAVING COUNT(*) >= 2 AND AVG(v.price) > 10000
ORDER BY o.first_name DESC;

-- SQL ZOO Section 6 & Section 7 COMPLETE !