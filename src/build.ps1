$html=[IO.File]::ReadAllText("onelinerformat.noscript.html")
$js=[IO.File]::ReadAllText("oneliner.js")

$html = $html.Replace("<script type='text/javascript' src='oneliner.js'></script>","<script type='text/javascript'>" + $js + "</script>")

md ..\build
[IO.File]::WriteAllText("..\build\onelinerformat.html",$html)