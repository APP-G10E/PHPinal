<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .navbar {
            background-color: #121721;
            width: 100%;
            padding: 10px 20px;
            text-align: center;
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        .navbar a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 5px;
            background-color: #00ADEF;
        }
        .navbar a:hover {
            background-color: #008DB9;
        }
        .content {
            width: 100%;
            max-width: 1200px;
            padding: 20px;
            justify-content: center;
            justify-items: center;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
    </style>
</head>
<body>
<div class="navbar">
    <a href="#" data-tab="userList">Liste des utilisateurs</a>
    <a href="#" data-tab="addFestival">Ajouter un festival</a>
</div>
<div class="content">
    <div id="userList" class="tab-content">
        <?php include 'customerList.php'; ?>
    </div>
    <div id="addFestival" class="tab-content">
        <?php include 'createFestival.php'; ?>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.navbar a');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-tab');

                tabContents.forEach(content => {
                    content.classList.remove('active');
                });

                document.getElementById(target).classList.add('active');
            });
        });

        // Activate the first tab by default
        tabs[0].click();
    });
</script>
</body>
</html>
