class AcademicAnalysisApp {
    constructor() {
        this.courses = [
            { 
                name: 'Kepemimpinan', 
                grade: 85,
                assignmentCompleted: true,
                attendance: 90,
                finalProjectReady: true
            },
            { 
                name: 'Matematika Dasar', 
                grade: 78,
                assignmentCompleted: true,
                attendance: 85,
                finalProjectReady: false
            },
            { 
                name: 'Fisika Dasar', 
                grade: 72,
                assignmentCompleted: true,
                attendance: 80,
                finalProjectReady: true
            },
            { 
                name: 'Teknologi Informasi', 
                grade: 88,
                assignmentCompleted: true,
                attendance: 95,
                finalProjectReady: true
            },
            { 
                name: 'Logika Informatika', 
                grade: 92,
                assignmentCompleted: true,
                attendance: 90,
                finalProjectReady: true
            },
            { 
                name: 'Kalkulus Diferensial', 
                grade: 68,
                assignmentCompleted: false,
                attendance: 70,
                finalProjectReady: false
            },
            { 
                name: 'Bahasa Inggris', 
                grade: 80,
                assignmentCompleted: true,
                attendance: 85,
                finalProjectReady: true
            },
            { 
                name: 'Algoritma & Pemrograman', 
                grade: 90,
                assignmentCompleted: true,
                attendance: 95,
                finalProjectReady: true
            }
        ];
        this.isDarkMode = false;
        this.currentTheme = 'blue';
        this.currentEditIndex = null;
        this.initialize();
    }

    initialize() {
        this.initializeEventListeners();
        this.renderCourses();
    }

    initializeEventListeners() {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.changeTheme(e.target.dataset.theme);
            });
        });

        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        document.getElementById('addCourseBtn').addEventListener('click', () => {
            this.addCourse();
        });

        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzeGrades();
        });

        document.getElementById('reportBtn').addEventListener('click', () => {
            this.generateReport();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetData();
        });

        // Modal event listeners
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('modalCancel').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('modalSave').addEventListener('click', () => {
            this.saveModal();
        });

        // Close modal when clicking outside
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });

        // Checkbox event listeners for modal
        document.getElementById('editAssignment').addEventListener('click', () => {
            this.toggleModalCheckbox('editAssignment');
        });

        document.getElementById('editProject').addEventListener('click', () => {
            this.toggleModalCheckbox('editProject');
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    changeTheme(theme) {
        this.currentTheme = theme;
        document.body.className = `theme-${theme}`;
        
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`.theme-option.${theme}`).classList.add('active');
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        const toggle = document.getElementById('darkModeToggle');
        
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggle.classList.add('active');
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggle.classList.remove('active');
        }
    }

    renderCourses() {
        const coursesGrid = document.getElementById('coursesGrid');
        coursesGrid.innerHTML = '';

        this.courses.forEach((course, index) => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-header">
                    <div class="course-name">${course.name}</div>
                    <div class="course-actions">
                        <button class="course-btn edit-btn" data-index="${index}">✏️</button>
                        <button class="course-btn delete-btn" data-index="${index}">🗑️</button>
                    </div>
                </div>
                <div class="grade-display">
                    <span class="grade-label">Nilai:</span>
                    <span class="grade-value">${course.grade}</span>
                </div>
                <div class="course-details">
                    <table class="attendance-table">
                        <tr>
                            <td><strong>Kehadiran:</strong></td>
                            <td class="attendance-value">${course.attendance}%</td>
                        </tr>
                        <tr>
                            <td><strong>Tugas:</strong></td>
                            <td class="attendance-value">${course.assignmentCompleted ? '✓ Selesai' : '✗ Belum'}</td>
                        </tr>
                        <tr>
                            <td><strong>Project:</strong></td>
                            <td class="attendance-value">${course.finalProjectReady ? '✓ Siap' : '✗ Belum'}</td>
                        </tr>
                    </table>
                    <button class="edit-details-btn" data-index="${index}">
                        ✏️ Edit Detail
                    </button>
                </div>
            `;
            coursesGrid.appendChild(courseCard);
        });

        this.addDynamicEventListeners();
    }

    addDynamicEventListeners() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.editCourse(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.deleteCourse(index);
            });
        });

        document.querySelectorAll('.edit-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.openEditModal(index);
            });
        });
    }

    openEditModal(index) {
        this.currentEditIndex = index;
        const course = this.courses[index];
        
        document.getElementById('editGrade').value = course.grade;
        document.getElementById('editAttendance').value = course.attendance;
        
        // Set checkboxes
        const assignmentCheckbox = document.getElementById('editAssignment');
        const projectCheckbox = document.getElementById('editProject');
        
        assignmentCheckbox.className = course.assignmentCompleted ? 'checkbox checked' : 'checkbox';
        projectCheckbox.className = course.finalProjectReady ? 'checkbox checked' : 'checkbox';
        
        document.getElementById('editModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        this.currentEditIndex = null;
    }

    toggleModalCheckbox(checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        checkbox.classList.toggle('checked');
    }

    saveModal() {
        if (this.currentEditIndex === null) return;
        
        const grade = parseInt(document.getElementById('editGrade').value) || 0;
        const attendance = parseInt(document.getElementById('editAttendance').value) || 0;
        const assignmentCompleted = document.getElementById('editAssignment').classList.contains('checked');
        const finalProjectReady = document.getElementById('editProject').classList.contains('checked');
        
        // Validasi
        if (grade < 0 || grade > 100) {
            alert('Nilai harus antara 0-100');
            return;
        }
        
        if (attendance < 0 || attendance > 100) {
            alert('Kehadiran harus antara 0-100%');
            return;
        }
        
        this.courses[this.currentEditIndex].grade = grade;
        this.courses[this.currentEditIndex].attendance = attendance;
        this.courses[this.currentEditIndex].assignmentCompleted = assignmentCompleted;
        this.courses[this.currentEditIndex].finalProjectReady = finalProjectReady;
        
        this.renderCourses();
        this.closeModal();
    }

    addCourse() {
        const courseName = prompt('Masukkan nama mata kuliah baru:');
        if (courseName && courseName.trim()) {
            this.courses.push({
                name: courseName.trim(),
                grade: 75,
                assignmentCompleted: false,
                attendance: 75,
                finalProjectReady: false
            });
            this.renderCourses();
        }
    }

    editCourse(index) {
        const newName = prompt('Edit nama mata kuliah:', this.courses[index].name);
        if (newName && newName.trim()) {
            this.courses[index].name = newName.trim();
            this.renderCourses();
        }
    }

    deleteCourse(index) {
        if (confirm(`Hapus mata kuliah "${this.courses[index].name}"?`)) {
            this.courses.splice(index, 1);
            this.renderCourses();
        }
    }

    analyzeGrades() {
        const studentName = document.getElementById('studentName').value;
        const studentNIM = document.getElementById('studentNIM').value;
        
        if (!studentName || !studentNIM) {
            alert('Harap isi nama dan NIM mahasiswa terlebih dahulu!');
            this.switchTab('student');
            return;
        }

        const total = this.courses.reduce((sum, course) => sum + course.grade, 0);
        const gpa = (total / this.courses.length / 25).toFixed(2);

        const allCoursesPassed = this.courses.every(course => 
            course.grade >= 60 && course.attendance >= 75 && course.assignmentCompleted
        );
        
        const failedCourses = this.courses.filter(course => 
            course.grade < 60 || course.attendance < 75 || !course.assignmentCompleted
        ).length;
        
        const graduationStatus = allCoursesPassed ? 'Lulus' : 'Tidak Lulus';

        const recommendations = this.getRecommendations(parseFloat(gpa));

        this.displayResults(gpa, graduationStatus, failedCourses, recommendations);
        
        document.getElementById('resultsSection').style.display = 'block';
        this.switchTab('results');
    }

    getRecommendations(gpa) {
        const recommendations = [];
        
        if (gpa >= 3.5) {
            recommendations.push('Rekomendasi beasiswa prestasi akademik');
        }
        
        const weakSubjects = this.courses.filter(course => 
            course.grade < 65 || course.attendance < 80
        ).length;
        
        if (weakSubjects > 2) {
            recommendations.push('Perlu improvement pada beberapa mata kuliah');
        }

        const incompleteProjects = this.courses.filter(course => 
            !course.finalProjectReady
        ).length;
        
        if (incompleteProjects > 0) {
            recommendations.push(`Perhatian: ${incompleteProjects} project akhir belum siap`);
        }

        if (recommendations.length === 0) {
            recommendations.push('Pertahankan performa akademik saat ini');
        }

        return recommendations;
    }

    displayResults(gpa, status, failedCourses, recommendations) {
        document.getElementById('gpaResult').textContent = gpa;
        document.getElementById('gpaDetails').textContent = this.getPredicate(parseFloat(gpa));
        
        const graduationStatusElement = document.getElementById('graduationStatus');
        graduationStatusElement.textContent = status;
        if (status === 'Tidak Lulus') {
            graduationStatusElement.classList.add('failed');
        } else {
            graduationStatusElement.classList.remove('failed');
        }
        
        document.getElementById('graduationDetails').textContent = 
            failedCourses === 0 ? 'Semua mata kuliah memenuhi syarat' : 
            `${failedCourses} mata kuliah tidak memenuhi syarat`;

        document.getElementById('recommendationResult').textContent = 
            recommendations.length + ' Rekomendasi';
        document.getElementById('recommendationDetails').textContent = 
            recommendations.join(' • ');
    }

    getPredicate(gpa) {
        if (gpa >= 3.5) return 'Cum Laude';
        if (gpa >= 3.0) return 'Sangat Memuaskan';
        if (gpa >= 2.5) return 'Memuaskan';
        if (gpa >= 2.0) return 'Cukup';
        return 'Tidak Memuaskan';
    }

    generateReport() {
        const studentName = document.getElementById('studentName').value;
        const studentNIM = document.getElementById('studentNIM').value;
        
        if (!studentName || !studentNIM) {
            alert('Harap isi nama dan NIM mahasiswa terlebih dahulu!');
            return;
        }

        let report = `LAPORAN ANALISIS AKADEMIK\n`;
        report += `========================\n`;
        report += `Nama: ${studentName}\n`;
        report += `NIM: ${studentNIM}\n\n`;
        report += `MATA KULIAH DAN NILAI:\n`;
        
        this.courses.forEach(course => {
            const status = (course.grade >= 60 && course.attendance >= 75 && course.assignmentCompleted) 
                ? 'Lulus' : 'Tidak Lulus';
            report += `- ${course.name}: ${course.grade} (${status})\n`;
            report += `  Kehadiran: ${course.attendance}%, Tugas: ${course.assignmentCompleted ? 'Selesai' : 'Belum'}, Project: ${course.finalProjectReady ? 'Siap' : 'Belum'}\n`;
        });

        const total = this.courses.reduce((sum, course) => sum + course.grade, 0);
        const gpa = (total / this.courses.length / 25).toFixed(2);
        
        report += `\nIPK: ${gpa}\n`;
        report += `Predikat: ${this.getPredicate(parseFloat(gpa))}\n`;

        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `laporan_${studentNIM}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    resetData() {
        if (confirm('Reset semua data ke nilai default?')) {
            this.courses = [
                { 
                    name: 'Kepemimpinan', 
                    grade: 85,
                    assignmentCompleted: true,
                    attendance: 90,
                    finalProjectReady: true
                },
                { 
                    name: 'Matematika Dasar', 
                    grade: 78,
                    assignmentCompleted: true,
                    attendance: 85,
                    finalProjectReady: false
                },
                { 
                    name: 'Fisika Dasar', 
                    grade: 72,
                    assignmentCompleted: true,
                    attendance: 80,
                    finalProjectReady: true
                },
                { 
                    name: 'Teknologi Informasi', 
                    grade: 88,
                    assignmentCompleted: true,
                    attendance: 95,
                    finalProjectReady: true
                },
                { 
                    name: 'Logika Informatika', 
                    grade: 92,
                    assignmentCompleted: true,
                    attendance: 90,
                    finalProjectReady: true
                },
                { 
                    name: 'Kalkulus Diferensial', 
                    grade: 68,
                    assignmentCompleted: false,
                    attendance: 70,
                    finalProjectReady: false
                },
                { 
                    name: 'Bahasa Inggris', 
                    grade: 80,
                    assignmentCompleted: true,
                    attendance: 85,
                    finalProjectReady: true
                },
                { 
                    name: 'Algoritma & Pemrograman', 
                    grade: 90,
                    assignmentCompleted: true,
                    attendance: 95,
                    finalProjectReady: true
                }
            ];
            this.renderCourses();
            
            document.getElementById('studentName').value = 'Andi Wijaya';
            document.getElementById('studentNIM').value = '12345678';
            document.getElementById('studentProgram').value = 'Teknik Informatika';
            document.getElementById('studentSemester').value = '4';
            document.getElementById('resultsSection').style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.academicApp = new AcademicAnalysisApp();
});
