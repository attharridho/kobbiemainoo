
        //  Kode ini menjalankan fungsi setelah seluruh elemen halaman selesai dimuat.
        document.addEventListener('DOMContentLoaded', function() {
            
            // Kode ini mengambil elemen tampilan, gambar status, dan semua tombol kalkulator untuk diproses dalam JavaScript.
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            // Kode ini menyimpan tiga URL gambar untuk kondisi normal, sukses, dan error pada kalkulator.
            const imgNormal = 'https://placehold.co/400x100/850E35/FFC4C4?text=Cihuylator';
            const imgSuccess = 'https://placehold.co/400x100/EE6983/FCF5EE?text=Bole+juga';
            const imgError = 'https://placehold.co/400x100/DC2626/FCF5EE?text=Gagitu+dong';

            /**
              Fungsi ini mengubah gambar status kalkulator sesuai kondisi sukses, error, atau normal. 
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    // Kode ini mengatur gambar kembali ke kondisi normal dengan src dan alt default.
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
              Fungsi ini menghapus tampilan kalkulator dan mengembalikan gambar ke kondisi normal. 
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Memanggil function untuk merubah gambar
            }

            /**
              Fungsi ini menghapus satu karakter terakhir dari tampilan kalkulator.
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              Fungsi ini menambahkan nilai yang ditekan ke tampilan kalkulator.
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              Fungsi ini akan menghitung hasil operasi yang ada di tampilan kalkulator.
             */
            function calculateResult() {
                //  Kode ini memberi kondisi jika tampilan kosong, maka gambar berubah ke error dan menampilkan teks "Kosong!". 
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    //  Kode ini menunggu 1.5 detik sebelum menghapus tampilan lalu menghentikan fungsi. 
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    //  Kode ini mengganti simbol persen menjadi pembagian 100 agar ekspresi dapat dihitung secara benar dengan eval.
                    let result = eval(display.value
                        .replace(/%/g, '/100') //  Jelaskan Kodingan ini apa 
                    ); 
                    
                    //  Kode ini menampilkan hasil perhitungan jika nilainya valid dan mengubah gambar menjadi status sukses. 
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); // Kode ini memicu error jika hasil perhitungan tidak valid.
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); //  Kode ini menangani kesalahan saat menghitung dengan menampilkan pesan Error, mengubah gambar menjadi error, lalu menghapus tampilan setelah 1.5 detik.
                    setTimeout(clearDisplay, 1500);
                }
            }


            //  Kode ini menangani klik pada setiap tombol kalkulator dengan mengambil nilai dari atribut data-value tombol tersebut.
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    //  Kode ini memeriksa nilai tombol yang ditekan, dan jika nilainya adalah 'C' maka akan menjalankan fungsi clearDisplay. 
                    switch(value) {
                        case 'C':
                            //  Kode ini menjalankan fungsi deleteLastChar jika tombol yang ditekan adalah 'DEL'.
                            clearDisplay();
                            break;
                        case 'DEL':
                            //  Kode ini menjalankan fungsi calculateResult ketika tombol yang ditekan adalah '='. 
                            deleteLastChar();
                            break;
                        case '=':
                            //  Kode ini menambahkan nilai tombol ke tampilan jika tombol bukan C, DEL, atau =. 
                            calculateResult();
                            break;
                        default:
                            //  Kode ini mengecek apakah gambar sedang dalam status sukses atau error, lalu menghapus tampilan sebelum menambahkan input baru ke display.
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            // Kode ini memungkinkan kalkulator dikendalikan lewat keyboard dengan menangani input angka, operator, Enter, Backspace, dan Escape.
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });
