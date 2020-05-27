using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Domain.Models
{
    public class Applicant
    {
        public int ID { get; set; }
        [MinLength(5),Required]
        public string Name { get; set; }
        [MinLength(5)]
        public string FamilyName { get; set; }
        [MinLength(10)]
        public string Address { get; set; }
        public string CountryOfOrigin { get; set; }
        [EmailAddress]
        public string EMailAdress { get; set; }
        [Range(20,60)]
        public int Age { get; set; }
        public bool Hired { get; set; }
    }
}
