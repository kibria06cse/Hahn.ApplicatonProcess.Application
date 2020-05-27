using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Data.Dtos
{
    public class ApplicantDto
    {
        public int ID { get; set; }
        [Required, StringLength(100, MinimumLength = 5)]
        public string Name { get; set; }
        [StringLength(100, MinimumLength = 5)]
        public string FamilyName { get; set; }
        [StringLength(100, MinimumLength = 5)]
        public string Address { get; set; }
        [StringLength(100, MinimumLength = 5)]
        public string CountryOfOrigin { get; set; }
        [EmailAddress, StringLength(100, MinimumLength = 5)]
        public string EMailAdress { get; set; }
        [Range(20,60)]
        public int Age { get; set; }
        public bool Hired { get; set; }

    }
}
