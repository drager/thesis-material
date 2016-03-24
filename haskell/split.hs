split :: (Int -> Bool) -> [Int] -> ([Int], [Int])
split p [] = ([], [])
split p (x:xs) = if p x then (x : ys, zs)
    else (ys, x : zs)
  where (ys, zs) = split p xs

split' :: (Int -> Bool) -> [Int] -> ([Int], [Int])
split' p [] = ([],[])
split' p (x:xs)
    | p x = (x : ys, zs)
    | not $ p x = (ys, x : zs)
  where (ys, zs) = split' p xs

split'' :: (Int -> Bool) -> [Int] -> ([Int], [Int])
split'' p [] = ([],[])
split'' p (x:xs)
    | p x = (x : ys, zs)
    | otherwise = (ys, x : zs)
  where (ys, zs) = split'' p xs

  isEven :: Int -> Bool
  isEven number = number `mod` 2 == 0
