<!DOCTYPE html>
<html lang="fr">

<?php
$page_title = "Home - EventsIT";
$css_file = "homepage.css";
include '../Styles/head.php';
?>

<script src="../Controller/common.js"></script>

<header>
    <div id="left-side-header">
        <img src="../Assets/Champion.png" id="logo-header" alt="Logo Champions">
    </div>
    <div id="right-side-header">
        <div id="lang-select">
            <div class="dropdown">
                <div class="dropbtn"><a id="flag1"></a></div>
                <div class="dropdown-content">
                    <div><a class="undraggable flagplus" id="flag2"></a></div>
                    <div><a class="undraggable flagplus" id="flag3"></a></div>
                </div>
            </div>
        </div>
        <div class="translatable right-header-button" id="header-subscribe" data-translation-key="subscribe"></div>
        <div class="translatable right-header-button" id="header-login" data-translation-key="connection"></div>
    </div>
</header>

<body>
<section>
    <div class="id">
        <img src="../Assets/Logo_high_res_center.png" alt="logo" id="img2">
        <p class="slogan translatable" data-translation-key="ourSlogan"></p>
    </div>
    <br></br>
</section>

<main>
    <div class="image-container">
        <img src="../Assets/fest3.png" alt="fest3" id="img8">
        <div class="image-text-title"><strong class="translatable" data-translation-key="stayInDirectContact"></strong></div>
        <div class="image-text-first-line translatable" data-translation-key="comfortableAndSafeListeningExperience"></div>
        <div class="image-text-second-line translatable" data-translation-key="championCaresForHealth"></div>
    </div>
    <br>
    <div class="image-container">
        <img src="../Assets/fest1.png" alt="logo" id="img3">
        <div class="image-text-title"><strong class="translatable" data-translation-key="interactWithFestivals"></strong></div>
        <div class="image-text-second-line translatable" data-translation-key="vote"></div>
    </div>
    <br>
    <div class="image-container">
        <img src="../Assets/fest2.png" alt="fest2" id="img4">
        <div class="image-text-title"><strong class="translatable" data-translation-key="accessPartnerFestivals"></strong></div>
        <div class="image-text-second-line translatable" data-translation-key="subscriptionBenefits"></div>
    </div>

    <div class="image-container">
        <div class="featured-festivals"><strong class="translatable" data-translation-key="featuredFestivals"></strong></div>
        <br></br>
        <div class="partner-festivals-list translatable" data-translation-key="partnerFestivalsList"></div>
    </div>
    <br></br>

    <!-- Carrousel d'images -->
    <div class="image-list">
        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "app_g10e";
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT `IMG-PATH` FROM festival WHERE `IMG-PATH` IS NOT NULL";
        $result = $conn->query($sql);

        $images = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                if (!empty($row['IMG-PATH'])) {
                    $images[] = $row['IMG-PATH'];
                }
            }
        } else {
            echo "0 results";
        }
        $conn->close();
        ?>
        <?php if (!empty($images)) : ?>
            <div class="carousel">
                <div class="carousel-track">
                    <?php foreach ($images as $imagePath) : ?>
                        <div class="carousel-slide">
                            <img src="<?php echo $imagePath; ?>">
                        </div>
                    <?php endforeach; ?>
                </div>
                <div class="carousel-buttons">
                    <button onclick="prevImage()">&#10094;</button>
                    <button onclick="nextImage()">&#10095;</button>
                </div>
            </div>
        <?php else : ?>
            <p>Aucune image disponible.</p>
        <?php endif; ?>
    </div>
</main>
</body>
<br></br>
<br></br>

<?php
include '../Styles/footer.php';
?>

</html>

<script src="../Controller/lang-select.js"></script>

<style>

    .carousel {
        position: relative;
        width: 900px; /* Ajusté pour afficher 3 images de 300px */
        height: 300px;
        overflow: hidden;
        border-radius: 10px;
        margin: auto;
    }
    .carousel-track {
        display: flex;
        transition: transform 1s ease;
    }
    .carousel-slide {
        min-width: 300px; /* Ajusté pour chaque image */
        height: 300px;
    }
    .carousel img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .carousel-buttons {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
        top: 50%;
        transform: translateY(-50%);
    }
    .carousel-buttons button {
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        padding: 10px;
        cursor: pointer;
    }
    .carousel-buttons button:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
</style>

<script>
    let currentIndex = 0;
    const slidesToShow = 3;
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const totalSlides = slides.length;

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(' + (-currentIndex * slideWidth) + 'px)';
    }

    function nextImage() {
        currentIndex = (currentIndex + slidesToShow) % totalSlides;
        updateCarousel();
    }

    function prevImage() {
        currentIndex = (currentIndex - slidesToShow + totalSlides) % totalSlides;
        updateCarousel();
    }
</script>
