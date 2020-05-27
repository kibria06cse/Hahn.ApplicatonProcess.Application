using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Data.Models
{
    public class Applicant : BaseEntity<int>
    {
        [MinLength(5), Required]
        public string Name { get; private set; }
        [MinLength(5)]
        public string FamilyName { get; private set; }
        [MinLength(10)]
        public string Address { get; private set; }
        public string CountryOfOrigin { get; private set; }
        [EmailAddress]
        public string EMailAdress { get; private set; }
        [Range(20, 60)]
        public int Age { get; private set; }
        public bool Hired { get; private set; }

        public bool IsDeleted { get; set; }
        public Applicant(int id) : base(id) { }
        private Applicant() { }



        public static Applicant Create(string name, string familyName, string address, string countryOfOrigin, string emailAddress, int age, bool hired)
        {
            var applicant = new Applicant();
            applicant.Name = name;
            applicant.FamilyName = familyName;
            applicant.Address = address;
            applicant.CountryOfOrigin = countryOfOrigin;
            applicant.EMailAdress = emailAddress;
            applicant.Age = age;
            applicant.Hired = hired;

            return applicant;
        }
        public void Update(string name, string familyName, string address, string countryOfOrigin, string emailAddress, int age, bool hired)
        {
            Name = name;
            FamilyName = familyName;
            Address = address;
            CountryOfOrigin = countryOfOrigin;
            EMailAdress = emailAddress;
            Age = age;
            Hired = hired;
        }
        public void MarkAsDeleted()
        {
            IsDeleted = true;
        }


    }
}
