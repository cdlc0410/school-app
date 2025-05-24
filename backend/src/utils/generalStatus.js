function generalStatus(school, students) {
    let schoolStatus = {
        name: school.name,
        sinceYear: school.since,
        currentYear: school.currentYear(),
        studentsCount: students.length,
        studentsApproved: 0,
        approvedPercentage: function () {
            let percentage = ((this.studentsApproved / this.studentsCount) * 100).toFixed(2) + "%";
            return percentage; 
        },
        studentsDisapproved: 0,
        disapprovedPercentage: function () {
            let percentage = ((this.studentsDisapproved / this.studentsCount) * 100).toFixed(2) + "%";
            return percentage;
        }
    }

    students.forEach(student => {
        if (student.approved == true) {
            schoolStatus.studentsApproved += 1
        } else {
            schoolStatus.studentsDisapproved += 1
        }
    });

    console.log(`---- Status General ----\n\n> School Name: ${schoolStatus.name}\n\t* School Since: ${schoolStatus.sinceYear}\n\t* Current Year: ${schoolStatus.currentYear}\n`)
    console.log(`> Students Population: ${schoolStatus.studentsCount}`)
    console.log(`\t* Approved:: ${schoolStatus.studentsApproved} (${schoolStatus.approvedPercentage()})`)
    console.log(`\t* Disapproved: ${schoolStatus.studentsDisapproved} (${schoolStatus.disapprovedPercentage()})\n`)
    console.log(`------------------------`)

    return schoolStatus;
}

export { generalStatus }