split :: (Integer -> Bool) -> [Integer] -> ([Integer], [Integer])
split p [] = ([], [])
split p (x:xs) = if p x then (x : ys, zs)
    else (ys, x : zs)
  where (ys, zs) = split p xs

p :: Integer -> Bool
p number = number `mod` 2 == 0