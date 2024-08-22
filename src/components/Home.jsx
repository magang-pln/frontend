import BackgroundImg from "../images/background.jpg";

const Home = () => {
  return (
    <>
      <header class="jumbotron jumbotron-fluid">
        <div class="overlay">
          <img src={BackgroundImg} alt="PLN Logo" class="logo" />
          <div class="container text-center">
            <h1 class="display-4 welcome-text">
              Selamat Datang di Website Data Aset dan Properti PLN Suluttenggo
            </h1>
            <div class="typing-container">
              <p class="lead typing-text">
                Mengelola dan Memantau Aset dengan Efisien
              </p>
            </div>
            <button class="btn btn-primary" id="loginBtn">
              Login
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
