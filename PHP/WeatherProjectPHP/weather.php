<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Details in <?php echo $_POST["city"] ?></title>
</head>
<body>
    <div style="text-allign:center; color:violet;">
        <?php
            $cityName =$_POST["city"];
            function getWeatherDetails($cityName){
                $url = "https://api.openweathermap.org/data/2.5/weather?q=".$cityName."&appid=e50608ef1ecc007c430bed5e758f5478&units=metric";

                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                $respose = curl_exec($ch);

                $data = json_decode($respose);

                return [$data->main->temp, $data->weather[0]->description];
            }
            $dataSet = getWeatherDetails($cityName);
            echo $cityName." is ".$dataSet[0]." celcius degree <br>";
            echo "Weather is currently ".$dataSet[1]." in ".$cityName;

        ?>
    </div>
   <form action="/" method="post">
    <button type="submit">Return Previous Page</button>
   </form> 
</body>
</html>